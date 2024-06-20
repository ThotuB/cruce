package controllers

import (
	"context"
	pbs "cruce-server/protobufs"
	"cruce-server/src/api/grpc/models"
	"cruce-server/src/api/grpc/repos"
	"cruce-server/src/utils/logger"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TableService struct {
	pbs.UnimplementedTableServiceServer
	log       logger.Logger
	tableRepo repos.TableRepo
}

func NewTableService(
	log logger.Logger,
	tableRepo repos.TableRepo,
) *TableService {
	return &TableService{
		log:       log,
		tableRepo: tableRepo,
	}
}

func (ts *TableService) Create(ctx context.Context, req *pbs.CreateTableRequest) (*pbs.CreateTableResponse, error) {
	gameMode := map[pbs.GameMode]string{
		0: "1v1",
		1: "1v1v1",
		2: "2v2",
	}[req.GetMode()]

	points := map[pbs.Points]string{
		0: "6",
		1: "11",
		2: "21",
	}[req.GetPoints()]

	turnTime := map[pbs.Time]string{
		0: "5s",
		1: "15s",
		2: "30s",
	}[req.GetTime()]

	table := &models.Table{
		UserId:   req.UserId,
		GameMode: gameMode,
		Points:   points,
		TurnTime: turnTime,
		Iber:     req.Iber,
		Cheating: req.Cheating,
		Password: req.Password,
	}

	id, err := ts.tableRepo.Create(ctx, table)
	if err != nil {
		ts.log.Error("tableRepo.Create:", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	return &pbs.CreateTableResponse{
		TableId: *id,
	}, nil
}

func (ts *TableService) ListAll(ctx context.Context, req *pbs.ListAllTablesRequest) (*pbs.ListAllTablesResponse, error) {
	tables, err := ts.tableRepo.ListAll(ctx)
	if err != nil {
		ts.log.Error("tableRepo.ListAll:\n", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	tablesProto := make([]*pbs.Table, 0, len(*tables))
	for _, table := range *tables {
		tableProto := table.ToProto()
		tablesProto = append(tablesProto, tableProto)
	}

	return &pbs.ListAllTablesResponse{
		Tables: tablesProto,
	}, nil
}

func (ts *TableService) Join(ctx context.Context, req *pbs.JoinTableRequest) (*pbs.JoinTableResponse, error) {
	err := ts.tableRepo.Join(ctx, req.UserId, req.TableId)
	if err != nil {
		ts.log.Error("tableRepo.Join:\n", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	return &pbs.JoinTableResponse{}, nil
}

func (ts *TableService) Leave(ctx context.Context, req *pbs.LeaveTableRequest) (*pbs.LeaveTableResponse, error) {
	return &pbs.LeaveTableResponse{}, nil
}

func (ts *TableService) Get(ctx context.Context, req *pbs.GetTableRequest) (*pbs.GetTableResponse, error) {
	table, err := ts.tableRepo.Get(ctx, req.Id)
	if err != nil {
		ts.log.Error("tableRepo.Get:\n", err)
		return nil, status.Error(codes.NotFound, "not found")
	}

	tableProto := table.ToProto()

	return &pbs.GetTableResponse{
		Table: tableProto,
	}, nil
}
