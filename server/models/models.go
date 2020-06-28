package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Letter Model
type Letter struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title string             `json:"title" bson:"title"`
	Body  string             `json:"body" bson:"body"`
}

// Question Model
type Question struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Open    bool               `json:"open" bson:"open"`
	Title   string             `json:"title" bson:"title"`
	Body    string             `json:"body" bson:"body"`
	Answers []*Answer          `json:"answers" bson:"answers"`
}

// Answer Model
type Answer struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserName string             `json:"username" bson:"username"`
	Title    string             `json:"title" bson:"title"`
	Body     string             `json:"body" bson:"body"`
}

// User Model
type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Questions []*Question        `json:"questions" bson:"questions"`
}

func (user User) getQuestion(questionID primitive.ObjectID) *Question {
	var question *Question
	for _, q := range user.Questions {
		if q.ID == questionID {
			question = q
			break
		}
	}
	return question
}
