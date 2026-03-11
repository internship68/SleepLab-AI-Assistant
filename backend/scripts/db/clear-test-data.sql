-- ============================================================
-- ลบข้อมูลทดสอบ — เก็บเฉพาะข้อมูลจริง
-- ============================================================
-- รันใน Neon SQL Editor หรือใช้: npx ts-node scripts/db/clear-test-data.ts
-- ============================================================

-- ลบ oa_settings ที่เป็น placeholder (TOKEN_REPLACE_*)
DELETE FROM oa_settings
WHERE channel_access_token LIKE 'TOKEN_REPLACE_%'
   OR channel_access_token = ''
   OR channel_secret LIKE 'SECRET_REPLACE_%';

-- ลบ faq_chunks ทั้งหมด (จะ index ใหม่จาก PDF จริง)
TRUNCATE TABLE faq_chunks;

-- ลบ users และ conversations ที่เป็นข้อมูลทดสอบ (ถ้ามี)
-- ถ้าไม่ต้องการลบประวัติแชท ให้ comment บรรทัดด้านล่าง
-- TRUNCATE TABLE conversations CASCADE;
-- TRUNCATE TABLE users CASCADE;

SELECT 'Test data cleared ✅' AS status;
