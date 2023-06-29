package mongodb

import (
	"context"
	"fmt"
	"time"

	"api-server/pkg/utils"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.opentelemetry.io/contrib/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo"
)

const (
	TodoListCollection = iota
)

// MongoInterface requires a MongoClient that implements the Initialize method to create the Mongo DB client
// and a initAllCollection method to initialize all DB Collections
type MongoInterface interface {
	initAllCollection()
}

// MongoClient structure contains all the Database collections and the instance of the Database
type MongoClient struct {
	Database           *mongo.Database
	TodoListCollection *mongo.Collection
}

var (
	collections = map[int]string{
		TodoListCollection: "todo",
	}

	dbName            = "api-server"
	ConnectionTimeout = 20 * time.Second
	backgroundContext = context.Background()
)

func MongoConnection() (*mongo.Client, error) {
	var (
		dbServer   = utils.Config.DbServer
		dbUser     = utils.Config.DbUser
		dbPassword = utils.Config.DbPassword
	)

	if dbServer == "" || dbUser == "" || dbPassword == "" {
		return nil, fmt.Errorf("missing required DB configuration")
	}

	credential := options.Credential{
		Username: dbUser,
		Password: dbPassword,
	}

	clientOptions := options.Client().ApplyURI(dbServer).SetAuth(credential)
	// setup open-telemetry tracing
	clientOptions.Monitor = otelmongo.NewMonitor()

	client, err := mongo.Connect(backgroundContext, clientOptions)
	if err != nil {
		return nil, err
	}
	ctx, _ := context.WithTimeout(backgroundContext, ConnectionTimeout)

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	} else {
		log.Infof("connected To MongoDB")
	}

	return client, nil
}

// Initialize initializes database connection
func Initialize(client *mongo.Client) *MongoClient {
	mongodbClient := &MongoClient{
		Database: client.Database(dbName),
	}
	mongodbClient.initAllCollection()

	return mongodbClient
}

// initAllCollection initializes all the database collections
func (m *MongoClient) initAllCollection() {
	m.TodoListCollection = m.Database.Collection(collections[TodoListCollection])
}
