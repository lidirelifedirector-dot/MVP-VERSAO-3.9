-- =========================================================
-- AUTENTICAÇÃO / SESSÕES
-- Criada para o fluxo Cadastro + Login do MVP 3.9.
-- As senhas nunca são armazenadas em texto puro.
-- =========================================================
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user
ON user_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_user_sessions_expires
ON user_sessions(expires_at);
