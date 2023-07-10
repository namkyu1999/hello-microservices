package rest_handlers

import (
	"net/http"

	"api-server/pkg/utils"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

const AuthenticateEndpoint = "/api/v1/auth/validate"

//var tracer = otel.Tracer("auth-server")

// AuthMiddleware is a middleware to authenticate the user
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//_, span := tracer.Start(c.Request.Context(), "auth-middleware")
		//defer span.End()
		req, err := http.NewRequest("GET", utils.Config.AuthServer+AuthenticateEndpoint, nil)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			log.Error(err)
			return
		}

		req.Header.Add("Authorization", c.GetHeader("Authorization"))

		client := http.Client{
			Transport: otelhttp.NewTransport(http.DefaultTransport),
		}

		res, err := client.Do(req)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			log.Error(err)
			return
		}
		defer res.Body.Close()
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			log.Error(err)
			return
		} else if res.StatusCode != http.StatusOK {
			c.Writer.WriteHeader(http.StatusUnauthorized)
			log.Error(err)
			return
		}

		c.Next()
	}
}
