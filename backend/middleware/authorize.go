package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// claim JWT
func Authorize() gin.HandlerFunc {
	return func(c *gin.Context) {
		jwttok := c.Request.Header.Get("Authorization")

		if jwttok == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"Err": "No Authorization header"})
			return
		}

		ext := strings.Split(jwttok, "Bearer ")

		if len(ext) == 2 {
			jwttok = strings.TrimSpace(ext[1])
		} else {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"Err": "Incorrect format"})
			return
		}

		tok, _ := jwt.ParseWithClaims(jwttok, &jwt.RegisteredClaims{}, func(c *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		claims, ok := tok.Claims.(*jwt.RegisteredClaims)

		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, "can't cast to registredclaim")
			return
		}

		if !tok.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, tok.Claims.Valid().Error())
			return
		}

		if !claims.VerifyIssuer("pass-man-authen", true) {
			c.AbortWithStatusJSON(http.StatusForbidden, "Invalid issuer")
			return
		}

		c.Request.Header.Set("user_id", claims.Subject)

		c.Next()
	}
}
