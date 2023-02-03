package models

type DataView struct {
	Id string `bson:"_id"`
	Data string `bson:"data"`
	Group string `bson:"group"`
}