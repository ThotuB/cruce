package interceptors

import (
	"context"
	"cruce-server/src/utils/logger"
	"time"

	"google.golang.org/grpc"
)

const (
	RED   = "\u001b[31m"
	BLUE  = "\u001b[34m"
	GREEN = "\u001b[32m"
	RESET = "\u001b[0m"
)

type loggingInterceptor struct {
	log logger.Logger
}

func NewLoggingInterceptor(log logger.Logger) *loggingInterceptor {
	return &loggingInterceptor{
		log: log,
	}
}

func (i *loggingInterceptor) Intercept(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (resp interface{}, err error) {
	i.log.Infof(BLUE+"GRPC REQUEST"+RESET+" [%s]", info.FullMethod)

	start := time.Now()
	reply, err := handler(ctx, req)
	elapsed := time.Since(start)

	if err != nil {
		i.log.Warnf(RED+"RESPONSE"+RESET+" (%v) Error:\n %v", elapsed, err)
	} else {
		i.log.Infof(GREEN+"RESPONSE"+RESET+" (%v) Success", elapsed)
	}

	return reply, err
}
