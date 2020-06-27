package main

import (
	"context"
	"deepback/helper"
	"deepback/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

var letters []models.Letter

func getLetters(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	collection := helper.ConnectToDB()

	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		fmt.Println(err)
	}

	defer cur.Close(context.Background())
	fmt.Println("lwl")

	for cur.Next(context.Background()) {

		// create a value into which the single document can be decoded
		var letter models.Letter

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

	router := mux.NewRouter()

	router.HandleFunc("/api/letters", getLetters).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
}
