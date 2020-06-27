package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Letter struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id"`
	Title string             `json:"title" bson:"title"`
	Body  string             `json:"body" bson:"body"`
}
