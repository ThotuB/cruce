package middleware

import (
	"cruce-server/src/utils/logger"
	"net/http"
)

const (
	RED   = "\u001b[31m"
	BLUE  = "\u001b[34m"
	GREEN = "\u001b[32m"
	RESET = "\u001b[0m"
)

type HTTPLoggingMiddleware struct {
	log logger.Logger
}

func NewHTTPLogginMiddleware(log logger.Logger) *HTTPLoggingMiddleware {
	return &HTTPLoggingMiddleware{
		log: log,
	}
}

func (m *HTTPLoggingMiddleware) Log(resp http.ResponseWriter, req *http.Request) (http.ResponseWriter, *http.Request) {
	m.log.Infof(BLUE+"HTTP REQUEST"+RESET+" [%v %v %v]", req.Proto, req.Method, req.URL)
	return resp, req
}
