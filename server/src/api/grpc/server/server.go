package server

import (
	"context"
	"cruce-server/config"
	"cruce-server/protobufs"
	"cruce-server/src/api/grpc/controllers"
	"cruce-server/src/api/grpc/interceptors"
	"cruce-server/src/api/grpc/middleware"
	"cruce-server/src/api/grpc/repos"
	"cruce-server/src/utils/logger"
	"fmt"
	"net"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/jmoiron/sqlx"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/reflection"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_recovery "github.com/grpc-ecosystem/go-grpc-middleware/recovery"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	grpc_opentracing "github.com/grpc-ecosystem/go-grpc-middleware/tracing/opentracing"
	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
)

type server struct {
	log logger.Logger
	cfg *config.Config
	db  *sqlx.DB
}

func NewServer(log logger.Logger, cfg *config.Config, db *sqlx.DB) *server {
	return &server{
		log: log,
		cfg: cfg,
		db:  db,
	}
}

func (self *server) Run() error {
	_, cancel := context.WithCancel(context.Background())
	defer cancel()

	// repos
	userRepo := repos.NewUserRepo(self.db)
	tableRepo := repos.NewTableRepo(self.db)

	// interceptors
	loggingInterceptor := interceptors.NewLoggingInterceptor(self.log)

	// middleware
	loggingMiddlewareHttp := middleware.NewHTTPLogginMiddleware(self.log)

	// listener
	listener, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", self.cfg.GRPC.Port))
	if err != nil {
		return err
	}
	defer listener.Close()

	// grpc server setup
	grpcServer := grpc.NewServer(
		grpc.Creds(insecure.NewCredentials()),
		grpc.UnaryInterceptor(grpc_middleware.ChainUnaryServer(
			grpc_ctxtags.UnaryServerInterceptor(),
			grpc_opentracing.UnaryServerInterceptor(),
			grpc_prometheus.UnaryServerInterceptor,
			// turn panic into grpc error
			grpc_recovery.UnaryServerInterceptor(),
			// log request and result
			loggingInterceptor.Intercept)),
	)
	reflection.Register(grpcServer)

	// service mounting
	userService := controllers.NewUserService(self.log, *userRepo)
	protobufs.RegisterUserServiceServer(grpcServer, userService)

	tableService := controllers.NewTableService(self.log, *tableRepo)
	protobufs.RegisterTableServiceServer(grpcServer, tableService)

	self.log.Info("grpc server listening at: ", listener.Addr())

	// start grpc server
	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			self.log.Fatal("grpc server failed to serve:\n", err)
		}
	}()

	// http server setup
	grpcWebServer := grpcweb.WrapServer(
		grpcServer,
		grpcweb.WithOriginFunc(func(origin string) bool { return true }),
	)

	httpServer := &http.Server{
		Handler: http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			resp, req = loggingMiddlewareHttp.Log(resp, req)
			grpcWebServer.ServeHTTP(resp, req)
			return
		}),
		Addr: fmt.Sprintf("localhost:%d", self.cfg.GRPC.ProxyPort),
	}

	self.log.Info("http server listening at: ", httpServer.Addr)

	if err := httpServer.ListenAndServe(); err != nil {
		self.log.Fatal("http server failed to server:\n", err)
	}

	return nil
}
