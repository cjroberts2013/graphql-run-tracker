const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')
require("dotenv").config();

const app = express();

// allow cross origin request
app.use(cors());

mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
}).on('error', function (error) {
	console.log('Error is: ', error);
});

// Use Routes
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

// Serve statis assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Listening");
});
