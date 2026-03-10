/**
 * dry-run-pdfjs.ts
 * Test PDF parsing using pdfjs-dist (better Thai font support)
 * Usage: npx ts-node --project tsconfig.json scripts/indexing/dry-run-pdfjs.ts
 */
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const pdfPath = path.resolve(__dirname, '../../knowledge-base.pdf');
    if (!fs.existsSync(pdfPath)) {
        console.error('❌ File not found:', pdfPath);
        process.exit(1);
    }

    console.log('📄 Loading PDF with pdfjs-dist...');
    // pdfjs-dist v3 CommonJS import
    const pdfjsLib: any = require('pdfjs-dist/legacy/build/pdf.js');
    pdfjsLib.GlobalWorkerOptions.workerSrc = false;

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true });
    const pdf = await loadingTask.promise;

    console.log(`\n📊 PDF Stats:`);
    console.log(`   Pages: ${pdf.numPages}`);

    let fullText = '';
    let pageErrors = 0;

    for (let i = 1; i <= pdf.numPages; i++) {
        try {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim();
            if (pageText.length > 0) {
                fullText += pageText + '\n\n';
            }
        } catch {
            pageErrors++;
        }
        if (i % 50 === 0) process.stdout.write(`   Processed ${i}/${pdf.numPages} pages...\r`);
    }

    console.log(`\n   Total chars extracted: ${fullText.length.toLocaleString()}`);
    console.log(`   Total words estimate: ${fullText.split(/\s+/).length.toLocaleString()}`);
    console.log(`   Page errors: ${pageErrors}`);

    if (fullText.length > 100) {
        // Show sample text
        console.log('\n📝 Sample text (first 500 chars):');
        console.log(fullText.substring(0, 500));
        console.log('\n...(middle sample)...');
        const mid = Math.floor(fullText.length / 2);
        console.log(fullText.substring(mid, mid + 300));

        // Save extracted text for inspection
        const outPath = path.resolve(__dirname, '../../extracted-text.txt');
        fs.writeFileSync(outPath, fullText, 'utf-8');
        console.log(`\n✅ Full text saved to: extracted-text.txt`);
        console.log('   Run: indexing pipeline will use this text');
    } else {
        console.log('\n⚠️  Very little text extracted — PDF may use custom encoding');
        console.log('   Consider "Save As" the PDF in Acrobat or Chrome to re-encode it');
    }
}

main().catch(err => {
    console.error('❌', err.message);
    process.exit(1);
});
