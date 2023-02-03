package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var db *mongo.Database

func DB() *mongo.Database {
	return db
}

func Connect() {
	server, ok := os.LookupEnv("DB_SERVER")
	if !ok {
		server = "0.0.0.0"
	}
	port, ok := os.LookupEnv("DB_PORT")
	if !ok {
		port = "27017"
	}
	user, _ := os.LookupEnv("DB_USER")
	passwd, _ := os.LookupEnv("DB_PASSWD")

	uri := fmt.Sprintf("mongodb://%s:%s@%s:%s", user, passwd, server, port)

	client, _ := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal("Cannot connect to mongodb")
	} else {
		log.Print("mongodb connected!")
	}

	db = client.Database("PasswdMan")

	setindex()
}

func setindex() {
	collection := db.Collection("Users")

	res, err := collection.Indexes().CreateOne(context.TODO(), mongo.IndexModel{Keys: bson.D{{Key: "name", Value: 1}}})

	if err != nil {
		println(err.Error())
		return
	}

	println("index created " + res)
}
