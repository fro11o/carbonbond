CREATE TABLE users (
  id VARCHAR(20) PRIMARY KEY,
  recommend_credit INT NOT NULL DEFAULT 3,
  password_bytes BYTEA NOT NULL,
  salt BYTEA NOT NULL
)
