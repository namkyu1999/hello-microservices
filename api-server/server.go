package main

import (
	"runtime"

	"api-server/pkg/database/mongodb"
	"api-server/pkg/rest_handlers"
	"api-server/pkg/utils"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	log "github.com/sirupsen/logrus"
)

func init() {
	err := envconfig.Process("", &utils.Config)
	log.SetReportCaller(true)

	log.Infof("go version: %s", runtime.Version())
	log.Infof("go os/arch: %s/%s", runtime.GOOS, runtime.GOARCH)

	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	client, err := mongodb.MongoConnection()
	if err != nil {
		log.Fatal(err)
	}

	mongoClient := mongodb.Initialize(client)

	var mongodbOperator mongodb.MongoOperator = mongodb.NewMongoOperations(mongoClient)

	gin.SetMode(gin.ReleaseMode)
	gin.EnableJsonDecoderDisallowUnknownFields()
	router := gin.New()
	router.Use(rest_handlers.LoggingMiddleware())
	router.Use(gin.Recovery())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
		AllowCredentials: true,
	}))

	router.GET("/status", rest_handlers.StatusHandler)
	router.GET("/todo/:username", rest_handlers.GetTodoHandler(mongodbOperator))
	router.POST("/todo", rest_handlers.CreateTodoHandler(mongodbOperator))
	router.PUT("/todo", rest_handlers.CompleteTodoHandler(mongodbOperator))
	router.DELETE("/todo", rest_handlers.DeleteTodoHandler(mongodbOperator))

	err = router.Run(":" + utils.Config.HttpPort)
	if err != nil {
		log.Fatal(err)
	}
}
