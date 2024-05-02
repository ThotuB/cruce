package repos

import (
	"github.com/jmoiron/sqlx"
)

type MessageRepo struct {
	db *sqlx.DB
}

func NewMessageRepo(db *sqlx.DB) *MessageRepo {
	return &MessageRepo{
		db: db,
	}
}

// func (self *MessageRepo) Create(ctx context.Context, table *models.Message) (*int32, error) {
// 	var tableId int32
// 	err := self.db.QueryRowx(
// 		`INSERT INTO tables (game_mode, points, turn_time, iber, cheating, password)
// 		VALUES ($1, $2, $3, $4, $5, $6)
// 		RETURNING id`,
// 		table.GameMode, table.Points, table.TurnTime, table.Iber, table.Cheating, table.Password,
// 	).Scan(&tableId)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return &tableId, nil
// }
//
// func (self *MessageRepo) ListAll(ctx context.Context) (*[]models.Message, error) {
// 	tables := []models.Message{}
// 	err := self.db.Select(&tables, `SELECT * FROM tables`)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return &tables, nil
// }
