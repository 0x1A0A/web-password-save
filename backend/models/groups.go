package models

type GroupsDoc struct {
	Id          string `bson:"_id"`
	Name        string `bson:"name"`
	Description string `bson:"desc"`
	Owner       string `bsob:"user_id"`
}

type GroupPayload struct {
	Name        string `json:"name"`
	Description string `json:"desc"`
}
