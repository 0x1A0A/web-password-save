package handler

import (
	"context"
	"net/http"
	"passwd-man/db"
	"passwd-man/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// POST /user
func Create_User(c *gin.Context) {
	var user models.UserPayload
	if err:=c.ShouldBindJSON(&user); err!=nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	collection := db.DB().Collection("Users")

	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)

	if err!= nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	} 

	res, err :=collection.InsertOne(context.TODO(), bson.D{
		{Key: "name", Value: user.Name},
		{Key: "passwd", Value: string(hashed)},
	})

	if err!= nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, res.InsertedID)
}