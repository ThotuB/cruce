package repos

import (
	"cruce-server/src/api/websocket/models"

	"github.com/jmoiron/sqlx"
)

type ChatRepo struct {
	db *sqlx.DB
}

func NewChatRepo(db *sqlx.DB) *ChatRepo {
	return &ChatRepo{
		db: db,
	}
}

// TODO
func (self *ChatRepo) PostMessage(messageInsert models.MessageInsert) (*models.MessageGet, error) {
	var messageGet models.MessageGet
	err := self.db.Get(&messageGet,
		`WITH inserted_message AS (
			INSERT INTO messages (user_id, message)
			VALUES ($1, $2)
			RETURNING *
		) SELECT u.user_id as "user.user_id", u.name as "user.name", u.image_url as "user.image_url", m.message as message, m.time as time
		FROM inserted_message as m
		INNER JOIN users as u
		ON m.user_id = u.user_id`,
		messageInsert.UserId,
		messageInsert.Message,
	)
	if err != nil {
		return nil, err
	}

	return &messageGet, nil
}

func (self *ChatRepo) GetHistory() (*[]models.MessageGet, error) {
	tables := []models.MessageGet{}
	err := self.db.Select(&tables,
		`SELECT u.user_id as "user.user_id", u.name as "user.name", u.image_url as "user.image_url", m.message as message, m.time as time
		FROM messages as m
		INNER JOIN users as u
		ON m.user_id = u.user_id`,
	)
	if err != nil {
		return nil, err
	}

	return &tables, nil
}
