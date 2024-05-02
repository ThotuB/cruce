package interceptors

import (
	"context"
	"log"
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
	log *log.Logger
}

func NewLoggingInterceptor(log *log.Logger) *loggingInterceptor {
	return &loggingInterceptor{
		log: log,
	}
}

func (this *loggingInterceptor) Intercept(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (resp interface{}, err error) {
	start := time.Now()

	this.log.Printf(BLUE+"GRPC REQUEST"+RESET+" [%s]", info.FullMethod)

	reply, err := handler(ctx, req)
	elapsed := time.Since(start)

	if err != nil {
		this.log.Printf(RED+"RESPONSE"+RESET+" (%v) Error:\n %v", elapsed, err)
	} else {
		this.log.Printf(GREEN+"RESPONSE"+RESET+" (%v) Success", elapsed)
	}

	return reply, err
}
