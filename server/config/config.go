package config

type Config struct {
	PostgreSQL PostgreSQL
	GRPC       GRPC
	WebSocket  WebSocket
}

type PostgreSQL struct {
	Host     string
	Port     uint32
	User     string
	Password string
	DBName   string
	SSLMode  string
	PgDriver string
}

type GRPC struct {
	Port      uint32
	ProxyPort uint32
}

type WebSocket struct {
	Port uint32
}

func createPgConfig() *PostgreSQL {
	return &PostgreSQL{
		Host:     "localhost",
		Port:     5432,
		User:     "tatu",
		Password: "tatupass",
		DBName:   "cruce_db",
		SSLMode:  "disable",
		PgDriver: "pgx",
	}
}

func newGRPCConfig() *GRPC {
	return &GRPC{
		Port:      8080,
		ProxyPort: 8081,
	}
}

func newWebSocketConfig() *WebSocket {
	return &WebSocket{
		Port: 8083,
	}
}

func NewConfig() (*Config, error) {
	postgresql := createPgConfig()
	grpc := newGRPCConfig()
	websocket := newWebSocketConfig()

	return &Config{
		PostgreSQL: *postgresql,
		GRPC:       *grpc,
		WebSocket:  *websocket,
	}, nil
}
