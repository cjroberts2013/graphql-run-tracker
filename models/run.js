const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runSchema = new Schema({
	type: String,
	date: String,
	distance: String,
	pace: String,
	time: String,
	notes: String,
	userId: String
});

module.exports = mongoose.model("Run", runSchema);
