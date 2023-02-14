package models

type GroupsDoc struct {
	Id          string `bson:"_id"`
	Name        string `bson:"name"`
	Description string `bson:"desc"`
	Owner       string `bson:"user_id"`
}

type GroupPayload struct {
	Name        string `json:"name"`
	Description string `json:"desc"`
}

type GroupsDataDoc struct {
	Id          string `bson:"_id" json:"id"`
	Name        string `bson:"name" json:"name"`
	Description string `bson:"desc" json:"desc"`
	// Owner       string      `bson:"user_id"`
	DataDoc []DataStrip `bson:"dataDoc" json:"data"`
}
