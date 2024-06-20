package controllers

import (
	"context"
	"cruce-server/protobufs"
	"cruce-server/src/api/grpc/models"
	"cruce-server/src/api/grpc/repos"
	"cruce-server/src/utils/logger"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserService struct {
	protobufs.UnimplementedUserServiceServer
	log      logger.Logger
	userRepo repos.UserRepo
}

func NewUserService(
	log logger.Logger,
	userRepo repos.UserRepo,
) *UserService {
	return &UserService{
		log:      log,
		userRepo: userRepo,
	}
}

func (us *UserService) Create(ctx context.Context, req *protobufs.CreateUserRequest) (*protobufs.CreateUserResponse, error) {
	user := &models.User{
		UserId:   req.UserId,
		Name:     req.Name,
		ImageUrl: req.ImageUrl,
	}

	err := us.userRepo.Create(ctx, user)
	if err != nil {
		us.log.Error("userRepo.Create:", err)
		return nil, status.Error(codes.Internal, "database error")
	}

	return &protobufs.CreateUserResponse{}, nil
}
