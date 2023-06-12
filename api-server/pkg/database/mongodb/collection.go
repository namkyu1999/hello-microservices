package mongodb

import (
	"errors"

	"go.mongodb.org/mongo-driver/mongo"
)

type GetCollectionInterface interface {
	getCollection(mongoClient MongoInterface, collectionType int) (*mongo.Collection, error)
}

type GetCollectionStruct struct{}

// getCollection function returns the appropriate DB collection based on the collection value passed
func (g *GetCollectionStruct) getCollection(mongoClient MongoInterface, collectionType int) (*mongo.Collection, error) {
	switch collectionType {
	case TodoListCollection:
		return mongoClient.(*MongoClient).TodoListCollection, nil
	default:
		return nil, errors.New("unknown collection name")
	}
}
