package controllers

import (
	"context"
	"cruce-server/protobufs"
	"cruce-server/src/api/grpc/models"
	"cruce-server/src/api/grpc/repos"
	"log"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TableService struct {
	protobufs.UnimplementedTableServiceServer
	log       *log.Logger
	tableRepo repos.TableRepo
}

func NewTableService(
	log *log.Logger,
	tableRepo repos.TableRepo,
) *TableService {
	return &TableService{
		log:       log,
		tableRepo: tableRepo,
	}
}

func (self *TableService) Create(ctx context.Context, req *protobufs.CreateTableRequest) (*protobufs.CreateTableResponse, error) {
	gameMode := map[protobufs.GameMode]string{
		0: "1v1",
		1: "1v1v1",
		2: "2v2",
	}[req.GetMode()]

	points := map[protobufs.Points]string{
		0: "6",
		1: "11",
		2: "21",
	}[req.GetPoints()]

	turnTime := map[protobufs.Time]string{
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

	id, err := self.tableRepo.Create(ctx, table)
	if err != nil {
		self.log.Println("tableRepo.Create:", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	return &protobufs.CreateTableResponse{
		TableId: *id,
	}, nil
}

func (self *TableService) ListAll(ctx context.Context, req *protobufs.ListAllTablesRequest) (*protobufs.ListAllTablesResponse, error) {
	tables, err := self.tableRepo.ListAll(ctx)
	if err != nil {
		self.log.Println("tableRepo.ListAll:", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	tablesProto := make([]*protobufs.Table, 0, len(*tables))
	for _, table := range *tables {
		tableProto := table.ToProto()
		tablesProto = append(tablesProto, tableProto)
	}

	return &protobufs.ListAllTablesResponse{
		Tables: tablesProto,
	}, nil
}

func (self *TableService) Join(ctx context.Context, req *protobufs.JoinTableRequest) (*protobufs.JoinTableResponse, error) {
	return &protobufs.JoinTableResponse{}, nil
}

func (self *TableService) Leave(ctx context.Context, req *protobufs.LeaveTableRequest) (*protobufs.LeaveTableResponse, error) {
	return &protobufs.LeaveTableResponse{}, nil
}

func (self *TableService) Get(ctx context.Context, req *protobufs.GetTableRequest) (*protobufs.GetTableResponse, error) {
	table, err := self.tableRepo.Get(ctx, req.Id)
	if err != nil {
		self.log.Println("tableRepo.Get:", err)
		return nil, status.Error(codes.NotFound, "not found")
	}

	tableProto := table.ToProto()

	return &protobufs.GetTableResponse{
		Table: tableProto,
	}, nil
}
