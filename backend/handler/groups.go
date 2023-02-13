package handler

import (
	"context"
	"net/http"
	"passwd-man/db"
	"passwd-man/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// POST /group
func Create_group(c *gin.Context) {
	var group models.GroupPayload
	if err := c.ShouldBindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	user, err := primitive.ObjectIDFromHex(c.Request.Header.Get("user_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	collection := db.DB().Collection("Groups")

	res, err := collection.InsertOne(context.TODO(), bson.D{
		{Key: "name", Value: group.Name},
		{Key: "desc", Value: group.Description},
		{Key: "user_id", Value: user},
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Ok": res.InsertedID})
}

// Get /groups
func Get_groups(c *gin.Context) {
	// get from Header
	user, err := primitive.ObjectIDFromHex(c.Request.Header.Get("user_id"))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	collection := db.DB().Collection("Groups")

	curr, err := collection.Find(context.TODO(), bson.D{
		{Key: "user_id", Value: user},
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	var groups []models.GroupsDoc
	if err := curr.All(context.TODO(), &groups); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Ok": groups})
}
