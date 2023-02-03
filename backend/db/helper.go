package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Group_exists(id primitive.ObjectID) bool {
	collection := db.Collection("Groups")

	res := collection.FindOne(context.TODO(), bson.D{
		{Key: "_id", Value: id},
	})

	if res.Err() != nil {
		return false
	}

	return true
}
