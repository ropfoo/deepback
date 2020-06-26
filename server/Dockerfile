FROM golang:latest

RUN apt-get update
RUN apt-get install vim -y
RUN go get "go.mongodb.org/mongo-driver/bson"
RUN go get "go.mongodb.org/mongo-driver/bson/primitive"
RUN go get "github.com/gorilla/mux"
WORKDIR /go/src
RUN mkdir /go/src/app
ADD . /go/src/app
WORKDIR /go/src/app
RUN go build -o main .
CMD ["/go/src/app/main"]