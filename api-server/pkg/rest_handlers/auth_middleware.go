package rest_handlers

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"

	"api-server/pkg/utils"
)

const AuthenticateEndpoint = "/api/v1/auth/validate"

func authMiddleware(jwt string) error {
	var request = struct {
		token string
	}{
		token: jwt,
	}
	pbytes, _ := json.Marshal(request)
	buff := bytes.NewBuffer(pbytes)
	res, err := http.Post(utils.Config.AuthServer+AuthenticateEndpoint, "application/json", buff)
	if err != nil {
		return err
	} else if res.StatusCode != http.StatusOK {
		return errors.New("invalid token")
	} else {
		return nil
	}
}
