package repos

import (
	"context"
	"cruce-server/src/api/grpc/models"

	"github.com/jmoiron/sqlx"
)

type TableRepo struct {
	db *sqlx.DB
}

func NewTableRepo(db *sqlx.DB) *TableRepo {
	return &TableRepo{
		db: db,
	}
}

func (self *TableRepo) Create(ctx context.Context, table *models.Table) (*int32, error) {
	var tableId int32
	tx, err := self.db.Beginx()
	if err != nil {
		return nil, err
	}

	// insert into tables
	err = tx.QueryRowx(
		`INSERT INTO tables (user_id, game_mode, points, turn_time, iber, cheating, password)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING table_id`,
		table.UserId, table.GameMode, table.Points, table.TurnTime, table.Iber, table.Cheating, table.Password,
	).Scan(&tableId)
	if err != nil {
		return nil, err
	}

	// insert into user_table
	_, err = tx.Exec(
		`INSERT INTO user_table (user_id, table_id)
		VALUES ($1, $2)`,
		table.UserId, tableId,
	)
	if err != nil {
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return &tableId, nil
}

func (self *TableRepo) ListAll(ctx context.Context) (*[]models.Table, error) {
	tables := []models.Table{}
	err := self.db.Select(&tables,
		`SELECT table_id, user_id, game_mode, points, turn_time, iber, cheating, password
		FROM tables
		ORDER BY created_at ASC`)
	if err != nil {
		return nil, err
	}

	return &tables, nil
}

func (self *TableRepo) Get(ctx context.Context, id int32) (*models.Table, error) {
	table := models.Table{}
	err := self.db.Get(&table,
		`SELECT table_id, user_id, game_mode, points, turn_time, iber, cheating, password
		FROM tables
		WHERE table_id=$1`, id)
	if err != nil {
		return nil, err
	}

	return &table, nil
}
