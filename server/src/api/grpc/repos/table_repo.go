package repos

import (
	"context"
	"cruce-server/src/api/grpc/models"
	"database/sql"
	"errors"

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

func (r *TableRepo) Create(ctx context.Context, table *models.Table) (*int32, error) {
	var tableId int32
	tx, err := r.db.Beginx()
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

func (r *TableRepo) ListAll(ctx context.Context) (*[]models.Table, error) {
	tables := []models.Table{}
	err := r.db.Select(&tables,
		`SELECT name, table_id, t.user_id, game_mode, points, turn_time, iber, cheating, password
		FROM tables as t
		JOIN users as u
		ON t.user_id = u.user_id
		ORDER BY created_at ASC`)
	if err != nil {
		return nil, err
	}

	return &tables, nil
}

func (r *TableRepo) Get(ctx context.Context, id int32) (*models.Table, error) {
	table := models.Table{}
	err := r.db.Get(&table,
		`SELECT table_id, user_id, game_mode, points, turn_time, iber, cheating, password
		FROM tables
		WHERE table_id=$1`, id)
	if err != nil {
		return nil, err
	}

	return &table, nil
}

var (
	ErrUserAlreadyInATable = errors.New("user is already in a table")
	ErrTableIsFull         = errors.New("table is full")
)

func (r *TableRepo) Join(ctx context.Context, userId string, tableId int32) error {
	tx, err := r.db.Beginx()
	if err != nil {
		return err
	}

	// check if the user is in a table
	var userTableId int32
	err = tx.Get(&userTableId,
		`SELECT table_id
		FROM user_table
		WHERE user_id=$1`,
		userId,
	)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			break
		default:
			return err
		}
	}
	if userTableId != 0 {
		if userTableId == tableId {
			return nil
		}
		return ErrUserAlreadyInATable
	}

	// check if the table is full
	var count int
	err = tx.Get(&count,
		`SELECT COUNT(*)
		FROM user_table
		WHERE table_id=$1`,
		tableId,
	)
	if err != nil {
		return err
	}
	if count == 4 {
		return ErrTableIsFull
	}

	// insert into user_table
	_, err = tx.Exec(
		`INSERT INTO user_table (user_id, table_id)
		VALUES ($1, $2)`,
		userId, tableId,
	)
	if err != nil {
		return err
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
