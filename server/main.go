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
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var letters []models.Letter

var users []models.User

func getUser(userID string) models.User {
	var user models.User
	for _, u := range users {
		if user.ID.String() == userID {
			user = u
			break
		}
	}
	return user
}

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

	users = nil

	for cur.Next(context.Background()) {

		// create a value into which the single document can be decoded
		var user models.User

		// & character returns the memory address of the following variable.
		err := cur.Decode(&user) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}
		//fmt.Println(cur.Current)
		// add item our array
		users = append(users, user)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(users) // encode similar to serialize process.
}

func postLetter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var letter models.Letter

	//var answer models.Answer

	err := json.NewDecoder(r.Body).Decode(&letter)
	if err != nil {
		fmt.Println(err)
	}
	letters = append(letters, letter)

	collection := helper.ConnectToDB()

	result, err := collection.InsertOne(context.Background(), letter)

	json.NewEncoder(w).Encode(result)
}

func getQuestion(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var user models.User

	// get id from url
	var params = mux.Vars(r)
	//fmt.Println(params["id"])

	id, _ := primitive.ObjectIDFromHex(params["id"])

	collection := helper.ConnectToDB()

	// find user with question by id in db
	filter := bson.M{"questions": bson.M{"$elemMatch": bson.M{"_id": id}}}

	err := collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		fmt.Println(err)
	}

	// find question in user questions array

	var question *models.Question

	for _, q := range user.Questions {
		if id == q.ID {
			question = q
		}
	}

	// check if user already send answer
	var answerUser models.AnswerUser

	e := json.NewDecoder(r.Body).Decode(&answerUser)
	if e != nil {
		fmt.Println(e)
	}

	answered := false

	// if already answered - save answer for response
	var answerUserResponse models.AnswerUserResponse
	for _, a := range question.Answers {
		if answerUser.UserID == a.UserID {
			fmt.Println("User in Answer:", a.UserID)
			answerUserResponse.Answer = a
			answerUserResponse.Message = "already answered"
			answered = true
			break
		}
	}

	// return question
	if answered == false {
		json.NewEncoder(w).Encode(question)
	} else {
		json.NewEncoder(w).Encode(answerUserResponse)
	}

}

func sendAnswer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var letter models.Letter

	err := json.NewDecoder(r.Body).Decode(&letter)
	if err != nil {
		fmt.Println(err)
	}

	collection := helper.ConnectToDB()

	questionID, _ := primitive.ObjectIDFromHex(letter.QuestionID)

	array := bson.M{"questions": bson.M{"$elemMatch": bson.M{"_id": questionID}}}
	pushToArray := bson.M{"$push": bson.M{"questions.$.answers": bson.M{"title": letter.Title, "body": letter.Body, "userID": letter.UserID}}}

	collection.UpdateOne(context.TODO(), array, pushToArray)

}

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/api/letters", getLetters).Methods("GET")
	router.HandleFunc("/api/question/{id}", getQuestion).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/letters", sendAnswer).Methods("POST", "OPTIONS")
	//router.HandleFunc("/api/letters", sendAnswer).Methods("PUT")

	log.Fatal(http.ListenAndServe(":8000", router))

}
