package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Letter Model
type Letter struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID     string             `json:"userID" bson:"userID"`
	QuestionID string             `json:"questionID" bson:"questionID"`
	Mood       string             `json:"mood" bson:"mood"`
	Title      string             `json:"title" bson:"title"`
	Body       string             `json:"body" bson:"body"`
}

// Question Model
type Question struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID   string             `json:"userID" bson:"userID,omitempty"`
	UserName string             `json:"displayName" bson:"displayName,omitempty"`
	Open     bool               `json:"open" bson:"open,omitempty"`
	Title    string             `json:"title" bson:"title,omitempty"`
	Body     string             `json:"body" bson:"body,omitempty"`
	Answers  []*Answer          `json:"answers" bson:"answers,omitempty"`
}

// Answer Model
type Answer struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID string             `json:"userID" bson:"userID"`
	Title  string             `json:"title" bson:"title"`
	Body   string             `json:"body" bson:"body"`
	Mood   string             `json:"mood" bson:"mood"`
}

// User Model
type User struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	DisplayName string             `json:"displayName" bson:"displayName"`
	Questions   []*Question        `json:"questions" bson:"questions,omitempty"`
}

// AnswerUser Model
type AnswerUser struct {
	UserID string `json:"userID" bson:"userID"`
}

//AnswerUserResponse Model
type AnswerUserResponse struct {
	Message string  `json:"message" bson:"message,omitempty"`
	Answer  *Answer `json:"answer" bson:"answer,omitempty"`
}

// Stats Model
type Stats struct {
	Question *Question `json:"question" bson:"question,omitempty"`
	Happy    int       `json:"happy" bson:"happy,omitempty"`
	Neutral  int       `json:"neutral" bson:"neutral,omitempty"`
	Sad      int       `json:"sad" bson:"sad,omitempty"`
	Default  int       `json:"default" bson:"default,omitempty"`
}

//CalcMoods Function
func (stats *Stats) CalcMoods() {
	for _, answer := range stats.Question.Answers {
		switch answer.Mood {
		case "happy":
			stats.Happy++
		case "neutral":
			stats.Neutral++
		case "sad":
			stats.Sad++
		default:
			stats.Default++
		}
	}

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
