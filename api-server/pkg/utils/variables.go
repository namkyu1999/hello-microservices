package utils

type Configurations struct {
	HttpPort   string `split_words:"true" default:"8001"`
	DbUser     string `split_words:"true" default:"admin"`
	DbPassword string `split_words:"true" default:"admin"`
	DbServer   string `split_words:"true" default:"mongodb://localhost:27017"`
	JwtSecret  string `split_words:"true" default:"404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"`
}

var Config Configurations
