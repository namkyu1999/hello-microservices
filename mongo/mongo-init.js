dbAdmin = db.getSiblingDB("admin");

// Create DB and collection
db = new Mongo().getDB("api-server");
db.createCollection("todo");