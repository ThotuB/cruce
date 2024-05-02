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

type UserService struct {
	protobufs.UnimplementedUserServiceServer
	log      *log.Logger
	userRepo repos.UserRepo
}

func NewUserService(
	log *log.Logger,
	userRepo repos.UserRepo,
) *UserService {
	return &UserService{
		log:      log,
		userRepo: userRepo,
	}
}

func (self *UserService) Create(ctx context.Context, req *protobufs.CreateUserRequest) (*protobufs.CreateUserResponse, error) {
	user := &models.User{
		UserId:   req.UserId,
		Name:     req.Name,
		ImageUrl: req.ImageUrl,
	}

	err := self.userRepo.Create(ctx, user)
	if err != nil {
		self.log.Println("userRepo.Create:", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	return &protobufs.CreateUserResponse{}, nil
}
