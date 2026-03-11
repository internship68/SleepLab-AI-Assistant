-- Add oa_settings table for 6 LINE OA support
CREATE TABLE IF NOT EXISTS oa_settings (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_oa_id           VARCHAR(255) UNIQUE NOT NULL,
  center_name          VARCHAR(255) NOT NULL,
  channel_access_token TEXT NOT NULL,
  channel_secret       VARCHAR(255) NOT NULL
);

-- เพิ่ม OA จริงผ่าน SQL หรือใช้ API (ไม่มี seed ข้อมูลทดสอบ)
-- ตัวอย่าง: INSERT INTO oa_settings (line_oa_id, center_name, channel_access_token, channel_secret)
--          VALUES ('OA_001', 'PNK Sleep Center', 'YOUR_TOKEN', 'YOUR_SECRET');

SELECT 'oa_settings table ready ✅' AS status;
