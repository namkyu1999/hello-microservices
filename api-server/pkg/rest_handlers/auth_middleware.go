package rest_handlers

import (
	"errors"
	"net/http"

	"api-server/pkg/utils"
)

const AuthenticateEndpoint = "/api/v1/auth/validate"

func authMiddleware(jwt string) error {
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
