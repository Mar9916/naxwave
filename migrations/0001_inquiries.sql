CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  interest TEXT NOT NULL DEFAULT '',
  quantity TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at);
