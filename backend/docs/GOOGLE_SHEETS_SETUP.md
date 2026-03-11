# การตั้งค่า Google Sheets สำหรับบันทึกผล Screening

## สิ่งที่ต้องเตรียม

### 1. สร้าง Google Cloud Project
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่ หรือเลือกโปรเจกต์ที่มีอยู่

### 2. เปิดใช้ Google Sheets API
1. ไปที่ **APIs & Services** → **Library**
2. ค้นหา "Google Sheets API"
3. กด **Enable**

### 3. สร้าง Service Account
1. ไปที่ **APIs & Services** → **Credentials**
2. กด **Create Credentials** → **Service Account**
3. ตั้งชื่อ (เช่น `sleep-lab-chatbot`)
4. กด **Create and Continue** → **Done**
5. คลิกที่ Service Account ที่สร้าง → แท็บ **Keys**
6. **Add Key** → **Create new key** → เลือก **JSON**
7. ดาวน์โหลดไฟล์ JSON เก็บไว้ในที่ปลอดภัย (อย่า commit ลง git)

### 4. สร้าง Google Sheet
1. ไปที่ [Google Sheets](https://sheets.google.com/)
2. สร้าง Spreadsheet ใหม่
3. ตั้งชื่อ Sheet แรกเป็น **ผลการประเมิน** (หรือชื่ออื่นตามต้องการ)
4. เพิ่มหัวคอลัมน์ในแถวที่ 1:
   | วันเวลา | LINE User ID | ชื่อ | ผลการประเมิน | คะแนน | การแนะนำ |
5. คัดลอก **Spreadsheet ID** จาก URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 5. แชร์ Sheet ให้ Service Account
1. Email ที่ต้องแชร์: **sleep-lab-chatbot@gen-lang-client-0428565634.iam.gserviceaccount.com**
2. กลับไปที่ Google Sheet → กด **Share**
3. ใส่ email ข้างบน
4. ตั้งสิทธิ์เป็น **Editor**
5. กด **Send**

### 6. ตั้งค่า .env
```env
GOOGLE_SHEETS_CREDENTIALS_PATH=./credentials/google-service-account.json
GOOGLE_SHEETS_SPREADSHEET_ID=1abc...xyz
GOOGLE_SHEETS_SHEET_NAME=ผลการประเมิน
```

หรือใช้ `GOOGLE_APPLICATION_CREDENTIALS` แทน `GOOGLE_SHEETS_CREDENTIALS_PATH` ได้

## โครงสร้างข้อมูลที่บันทึก

| คอลัมน์ | ตัวอย่าง |
|---------|----------|
| วันเวลา | 2025-03-11T18:30:00.000Z |
| LINE User ID | U90682a596cb96268deaee413326b73ea |
| ชื่อ | - (หรือ display name ถ้ามี) |
| ผลการประเมิน | High Risk / Low Risk |
| คะแนน | 0, 1, 2, หรือ 3 |
| การแนะนำ | ข้อความแนะนำที่ส่งให้ user |

## หมายเหตุ
- ถ้าไม่ตั้งค่า env ระบบจะข้ามการบันทึก (ไม่ error)
- การบันทึกเป็นแบบ fire-and-forget ไม่ block การตอบ user
