package repos

import (
	"cruce-server/src/api/grpc/models"

	"github.com/jmoiron/sqlx"
)

type GameRepo struct {
	db *sqlx.DB
}

func NewGameRepo(db *sqlx.DB) *GameRepo {
	return &GameRepo{
		db: db,
	}
}

func (self *GameRepo) GetUserBelongingToTable(userId string, tableId int) (*models.User, error) {
	var user models.User
	err := self.db.Get(&user,
		`SELECT u.user_id as user_id, u.name as name, u.image_url as image_url
		FROM user_table as ut
		JOIN users as u
		ON ut.user_id = u.user_id
		WHERE ut.user_id = $1 AND ut.table_id = $2`,
		userId,
		tableId,
	)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
