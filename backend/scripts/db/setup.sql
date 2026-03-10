-- ============================================================
-- Neon PostgreSQL — Setup Script for SleepLab AI Chatbot
-- ============================================================
-- Run this script once in the Neon SQL Editor (or psql) BEFORE
-- starting the NestJS server or running the indexing pipeline.
-- ============================================================

-- 1. Enable pgvector extension (required for RAG embeddings)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create users table
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_user_id    VARCHAR(255) NOT NULL,
  line_oa_id      VARCHAR(255) NOT NULL,
  state           VARCHAR(50)  NOT NULL DEFAULT 'START',
  screening_step  VARCHAR(100),
  last_message    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (line_user_id, line_oa_id)  -- one record per user per OA
);

-- 3. Create conversations table (chat history)
CREATE TABLE IF NOT EXISTS conversations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message    TEXT NOT NULL,
  role       VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  timestamp  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create faq_chunks table (RAG knowledge base)
CREATE TABLE IF NOT EXISTS faq_chunks (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content   TEXT NOT NULL,
  embedding VECTOR(1536),        -- text-embedding-3-small dimension
  source    VARCHAR(255)
);

-- 5. Create an HNSW index on the embedding column for fast similarity search
--    (Run AFTER indexing pipeline has inserted data for best performance)
CREATE INDEX IF NOT EXISTS faq_chunks_embedding_idx
  ON faq_chunks USING hnsw (embedding vector_l2_ops);

-- 6. Verify
SELECT 'Setup complete ✅' AS status;
