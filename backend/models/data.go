package models

type DataView struct {
	Id    string `bson:"_id"`
	Data  string `bson:"data"`
	Group string `bson:"group_id"`
	Owner string `bson:"user_id"`
}

type DataPayload struct {
	Data  string `json:"data"`
	Group string `json:"group_id"`
}

type DataStrip struct {
	Id   string `bson:"_id" json:"id"`
	Data string `bson:"data" json:"data"`
}
