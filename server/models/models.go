package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Letter Model
type Letter struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title string             `json:"title" bson:"title"`
	Body  string             `json:"body" bson:"body"`
}
