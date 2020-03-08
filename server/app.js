const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// allow cross origin request
app.use(cors());

mongoose.connect(process.env.MONGO_KEY);
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log("Listening");
});
