package repos

import (
	"context"
	"cruce-server/src/api/grpc/models"

	"github.com/jmoiron/sqlx"
)

type UserRepo struct {
	db *sqlx.DB
}

func NewUserRepo(db *sqlx.DB) *UserRepo {
	return &UserRepo{
		db: db,
	}
}

func (self *UserRepo) Create(ctx context.Context, user *models.User) error {
	_, err := self.db.NamedExec(
		`INSERT INTO users (user_id, name, image_url)
		VALUES (:user_id, :name, :image_url)
		ON CONFLICT (user_id)
		DO UPDATE SET
			name = :name,
			image_url = :image_url`,
		user,
	)
	if err != nil {
		return err
	}

	return nil
}
