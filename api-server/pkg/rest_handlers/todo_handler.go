package rest_handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"api-server/pkg/database/mongodb"
	"api-server/pkg/database/mongodb/todo"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateTodoRequest struct {
	Body     string `json:"body"`
	Username string `json:"username"`
}

type CompleteTodoRequest struct {
	Username string `json:"username"`
	Id       string `json:"id"`
}

func CreateTodoHandler(mongodbOperator mongodb.MongoOperator) gin.HandlerFunc {
	todoOperator := todo.NewTodoOperator(mongodbOperator)
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx := context.Background()

		var todoRequest CreateTodoRequest
		err := c.BindJSON(&todoRequest)

		if err != nil {
			c.Writer.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(c.Writer, "invalid request : "+err.Error())
			return
		}

		todo := todo.Todo{
			ID:        uuid.NewString(),
			Body:      todoRequest.Body,
			CreatedAt: time.Now().String(),
			Completed: false,
			Username:  todoRequest.Username,
		}

		err = todoOperator.CreateTodo(ctx, &todo)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(c.Writer, "error while save to db : "+err.Error())
			return
		}

		c.JSON(http.StatusOK, todo)
	}
}

func GetTodoHandler(mongodbOperator mongodb.MongoOperator) gin.HandlerFunc {
	todoOperator := todo.NewTodoOperator(mongodbOperator)
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx := context.Background()
		username := c.Param("username")

		todos, err := todoOperator.GetTodos(ctx, username)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(c.Writer, "error while get from db : "+err.Error())
			return
		}

		c.JSON(http.StatusOK, todos)
	}
}

func CompleteTodoHandler(mongodbOperator mongodb.MongoOperator) gin.HandlerFunc {
	todoOperator := todo.NewTodoOperator(mongodbOperator)
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx := context.Background()

		var completeTodoRequest CompleteTodoRequest
		err := c.BindJSON(&completeTodoRequest)

		err = todoOperator.CompleteTodo(ctx, completeTodoRequest.Username, completeTodoRequest.Id)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(c.Writer, "error while get from db : "+err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "success"})
	}
}

func DeleteTodoHandler(mongoOperator mongodb.MongoOperator) gin.HandlerFunc {
	todoOperator := todo.NewTodoOperator(mongoOperator)
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx := context.Background()

		var completeTodoRequest CompleteTodoRequest
		err := c.BindJSON(&completeTodoRequest)

		err = todoOperator.DeleteTodo(ctx, completeTodoRequest.Username, completeTodoRequest.Id)
		if err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(c.Writer, "error while get from db : "+err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "success"})
	}
}
