package main

import (
	"context"

	"passwd-man/db"
	"passwd-man/handler"
	"passwd-man/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		println(err.Error())
	}

	db.Connect()

	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.POST("/user", handler.Create_User)
	router.POST("/auth", handler.Login)

	jwt_router := router.Use(middleware.Authorize())
	jwt_router.POST("/group", handler.Create_group)
	jwt_router.POST("/data", handler.Craete_data)
	jwt_router.GET("/groups", handler.Get_groups)
	jwt_router.GET("/groups_data", handler.Get_groups_data)
	jwt_router.GET("/datas", handler.Get_datas)

	router.Run("0.0.0.0:8000")

	defer func() {
		if err := db.DB().Client().Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
}
