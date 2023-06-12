package todo

import (
	"context"

	"api-server/pkg/database/mongodb"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
)

type Operator struct {
	operator mongodb.MongoOperator
}

func NewTodoOperator(mongodbOperator mongodb.MongoOperator) *Operator {
	return &Operator{
		operator: mongodbOperator,
	}
}

func (c *Operator) CreateTodo(ctx context.Context, todo *Todo) error {
	err := c.operator.Create(ctx, mongodb.TodoListCollection, todo)
	if err != nil {
		log.Error("error creating ChaosHub: ", err)
		return err
	}
	return nil
}

func (c *Operator) GetTodos(ctx context.Context, username string) ([]Todo, error) {
	query := bson.D{
		{"username", username},
	}
	results, err := c.operator.List(ctx, mongodb.TodoListCollection, query)
	if err != nil {
		log.Error("error getting todos : ", err)
		return []Todo{}, err
	}
	var todos []Todo
	err = results.All(ctx, &todos)
	if err != nil {
		log.Error("error deserializing todos in todo object : ", err)
		return []Todo{}, err
	}
	return todos, nil
}

func (c *Operator) CompleteTodo(ctx context.Context, username, id string) error {
	query := bson.D{
		{"username", username},
		{"id", id},
	}
	update := bson.D{{"$set", bson.D{{"completed", true}}}}

	updateResult, err := c.operator.Update(ctx, mongodb.TodoListCollection, query, update)
	if err != nil {
		log.Error("error updating todo : ", err)
		return err
	}

	if updateResult.MatchedCount == 0 {
		log.Error("no todo found with given username and id")
		return err
	}

	return nil
}

func (c *Operator) DeleteTodo(ctx context.Context, username, id string) error {
	query := bson.D{
		{"username", username},
		{"id", id},
	}

	_, err := c.operator.Delete(ctx, mongodb.TodoListCollection, query)
	if err != nil {
		return err
	}

	return nil
}
