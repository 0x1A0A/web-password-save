package handler

import (
	"context"
	"net/http"
	"passwd-man/db"
	"passwd-man/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// POST /data
func Craete_data(c *gin.Context) {
	var data models.DataPayload
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	collection := db.DB().Collection("Datas")

	gid, err := primitive.ObjectIDFromHex(data.Group)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	if !db.Group_exists(gid) {
		c.JSON(http.StatusBadRequest, "Group not exists")
		return
	}

	res, err := collection.InsertOne(context.TODO(), bson.D{
		{Key: "data", Value: data.Data},
		{Key: "group_id", Value: gid},
	})

	if err != nil {
		c.JSON(http.StatusInsufficientStorage, err.Error())
		return
	}

	c.JSON(http.StatusOK, res.InsertedID)
}

// GET /datas
// get all data from the user

/*
db.Datas.aggregate([ {

	$lookup: {
		"from": "Groups",
		"localField": "group_id",
		"foreignField": "_id",
		"as": "gDoc"}},
	{ $unwind : "$gDoc" },
	{$match: { "gDoc._id" : ObjectId("63dc9a7e029496bd07d7626b") }} ,
	{$project : {
		"_id" : 1,
		"data" : 1,
		"group_id" : 1,
		"user_id" :
		"$gDoc._id"}
		}
	])
*/
func Get_datas(c *gin.Context) {
	user, err := primitive.ObjectIDFromHex(c.Request.Header.Get("user_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	collection := db.DB().Collection("Datas")

	groupLookup := bson.D{{
		Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "Groups"},
			{Key: "localField", Value: "group_id"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "groupDoc"},
		},
	}}

	project := bson.D{{
		Key: "$project", Value: bson.D{
			{Key: "_id", Value: 1},
			{Key: "data", Value: 1},
			{Key: "group_id", Value: 1},
			{Key: "user_id", Value: "$groupDoc.user_id"},
		},
	}}

	cur, err := collection.Aggregate(context.TODO(), mongo.Pipeline{
		groupLookup,
		bson.D{{Key: "$unwind", Value: "$groupDoc"}},
		bson.D{{
			Key: "$match", Value: bson.D{{
				Key:   "groupDoc.user_id",
				Value: user,
			}},
		}},
		project,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	var res []models.DataView
	if err := cur.All(context.TODO(), &res); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, res)
}
