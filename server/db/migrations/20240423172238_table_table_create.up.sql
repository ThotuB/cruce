CREATE TYPE game_mode AS ENUM ('1v1', '1v1v1', '2v2');
CREATE TYPE points AS ENUM ('6', '11', '21');
CREATE TYPE turn_time AS ENUM ('5s', '15s', '30s');

CREATE TABLE IF NOT EXISTS tables (
	table_id SERIAL PRIMARY KEY,
	user_id TEXT REFERENCES users (user_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	game_mode game_mode NOT NULL,
	points points NOT NULL,
	turn_time turn_time NOT NULL,
	iber BOOL NOT NULL,
	cheating BOOL NOT NULL,
	password VARCHAR(10),
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
)
