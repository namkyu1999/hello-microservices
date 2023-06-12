package rest_handlers

import (
	"encoding/json"
	"net/http"

	"api-server/pkg/utils"
	"github.com/gin-gonic/gin"
)

type APIStatus struct {
	Status string `json:"status"`
}

// StatusHandler returns current status of this application
func StatusHandler(c *gin.Context) {
	var status = APIStatus{Status: "up"}
	statusByte, err := json.Marshal(status)
	if err != nil {
		utils.WriteHeaders(&c.Writer, http.StatusInternalServerError)
		return
	}
	utils.WriteHeaders(&c.Writer, http.StatusOK)
	c.Writer.Write(statusByte)
}
