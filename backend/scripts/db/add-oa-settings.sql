-- Add oa_settings table for 6 LINE OA support
CREATE TABLE IF NOT EXISTS oa_settings (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_oa_id           VARCHAR(255) UNIQUE NOT NULL,
  center_name          VARCHAR(255) NOT NULL,
  channel_access_token TEXT NOT NULL,
  channel_secret       VARCHAR(255) NOT NULL
);

-- Seed the 6 LINE OA accounts (fill in real tokens from LINE Developers Console)
INSERT INTO oa_settings (line_oa_id, center_name, channel_access_token, channel_secret)
VALUES
  ('OA_001', 'SMD Sappaya สาขา 1',    'TOKEN_REPLACE_1', 'SECRET_REPLACE_1'),
  ('OA_002', 'SMD Sappaya สาขา 2',    'TOKEN_REPLACE_2', 'SECRET_REPLACE_2'),
  ('OA_003', 'SMD Sappaya สาขา 3',    'TOKEN_REPLACE_3', 'SECRET_REPLACE_3'),
  ('OA_004', 'SMD Sappaya สาขา 4',    'TOKEN_REPLACE_4', 'SECRET_REPLACE_4'),
  ('OA_005', 'SMD Sappaya สาขา 5',    'TOKEN_REPLACE_5', 'SECRET_REPLACE_5'),
  ('OA_006', 'SMD Sappaya สาขา 6',    'TOKEN_REPLACE_6', 'SECRET_REPLACE_6')
ON CONFLICT (line_oa_id) DO NOTHING;

SELECT 'oa_settings table ready ✅' AS status;
