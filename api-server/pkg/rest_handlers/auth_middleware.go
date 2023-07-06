package rest_handlers

import (
	"context"
	"errors"
	"net/http"

	"api-server/pkg/utils"
	"go.opentelemetry.io/otel"
)

const AuthenticateEndpoint = "/api/v1/auth/validate"

var tracer = otel.Tracer("api-server")

func authMiddleware(ctx context.Context, jwt string) error {
	_, span := tracer.Start(ctx, "auth-middleware")
	defer span.End()
	req, err := http.NewRequest("GET", utils.Config.AuthServer+AuthenticateEndpoint, nil)
	if err != nil {
		return err
	}

	req.Header.Add("Authorization", jwt)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if err != nil {
		return err
	} else if res.StatusCode != http.StatusOK {
		return errors.New("invalid token")
	} else {
		return nil
	}
}
