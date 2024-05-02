package middleware

import (
	"log"
	"net/http"
)

const (
	RED   = "\u001b[31m"
	BLUE  = "\u001b[34m"
	GREEN = "\u001b[32m"
	RESET = "\u001b[0m"
)

type HTTPLoggingMiddleware struct {
	log *log.Logger
}

func NewHTTPLogginMiddleware(log *log.Logger) *HTTPLoggingMiddleware {
	return &HTTPLoggingMiddleware{
		log: log,
	}
}

func (self *HTTPLoggingMiddleware) Log(resp http.ResponseWriter, req *http.Request) (http.ResponseWriter, *http.Request) {
	self.log.Printf(BLUE+"HTTP REQUEST"+RESET+" [%v %v %v]", req.Proto, req.Method, req.URL)
	return resp, req
}
