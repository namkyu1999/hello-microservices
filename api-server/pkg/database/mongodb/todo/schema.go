package todo

type Todo struct {
	ID        string `bson:"id" json:"id"`
	Username  string `bson:"username" json:"username"`
	Body      string `bson:"body" json:"body"`
	CreatedAt string `bson:"created_at" json:"created_at"`
	Completed bool   `bson:"completed" json:"completed"`
}
