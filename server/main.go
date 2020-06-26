package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Letter struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id"`
	Title string             `json:"title" bson:"title"`
	Body  string             `json:"body" bson:"body"`
}

var letters []Letter

func getLetters(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb://root:example@localhost:27018"))
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Connected to MongoDB!")
	collection := client.Database("testletters").Collection("letters")

	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		fmt.Println(err)
	}

	defer cur.Close(context.Background())
	fmt.Println("lwl")

	for cur.Next(context.Background()) {

		// create a value into which the single document can be decoded
		var letter Letter

		// & character returns the memory address of the following variable.
		err := cur.Decode(&letter) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(cur.Current)
		// add item our array
		letters = append(letters, letter)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(letters) // encode similar to serialize process.
}

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/api/letters", getLetters).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", r))
}
