ifneq (,$(wildcard ./.env))
    include .env
    export
endif

TIMES ?=

db_start:
	sudo docker compose up -d

db_stop:
	sudo docker compose down

db_connect:
	psql cruce_db -h localhost -U tatu

db_migrate_up:
	migrate -path ./db/migrations -database "${LOCAL_POSTGRES_URL}" up $(TIMES)

db_migrate_down:
	migrate -path ./db/migrations -database "${LOCAL_POSTGRES_URL}" down $(TIMES)

server_run:
	go run ./src
