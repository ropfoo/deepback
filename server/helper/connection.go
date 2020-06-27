package helper

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectToDB : connects to mongo db
func ConnectToDB() *mongo.Collection {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://root:example@localhost:27018"))
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Connected to MongoDB!")

	collection := client.Database("testletters").Collection("letters")

	return collection
}
