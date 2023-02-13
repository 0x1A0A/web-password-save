package handler

import (
	"context"
	"net/http"
	"os"
	"passwd-man/db"
	"passwd-man/models"
	"time"

	"github.com/golang-jwt/jwt/v4"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// POST /auth
func Login(c *gin.Context) {
	var user models.UserPayload

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	collection := db.DB().Collection("Users")

	result := collection.FindOne(context.TODO(), bson.D{
		{Key: "name", Value: user.Name},
	})

	var userDoc models.UsersDoc
	if err := result.Decode(&userDoc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userDoc.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	// OK this user has valid credential
	// gen and return JWT for them
	secret, ok := os.LookupEnv("JWT_SECRET")

	if !ok {
		secret = "secret"
	}

	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		Issuer:    "pass-man-authen",
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Subject:   userDoc.Id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signed, err := token.SignedString([]byte(secret))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Err": gin.H{"str": err.Error()}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Ok": gin.H{"token": signed}})
}
