package database

import (
	"context"
	"cruce-server/config"
	"fmt"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

const (
	maxConn           = 50
	healthCheckPeriod = 3 * time.Minute
	maxConnIdleTime   = 1 * time.Minute
	maxConnLifetime   = 3 * time.Minute
	minConns          = 10
	lazyConnect       = false
)

func Connect(cfg *config.PostgreSQL) (*sqlx.DB, error) {
	ctx := context.Background()
	dataSourceName := fmt.Sprintf("user=%s password=%s host=%s port=%d dbname=%s sslmode=%s",
		cfg.User, cfg.Password, cfg.Host, cfg.Port, cfg.DBName, cfg.SSLMode,
	)

	db, err := sqlx.ConnectContext(ctx, "pgx", dataSourceName)
	if err != nil {
		return nil, err
	}

	return db, nil
}
