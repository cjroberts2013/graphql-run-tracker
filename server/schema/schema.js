const graphql = require("graphql");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLInt
} = graphql;

const _ = require("lodash");

// Dummy Data
var runs = [
	{
		type: "long run",
		date: "02/03/2020",
		distance: "26.2 mile",
		pace: "10:31/mi",
		time: "5:45:58",
		notes: "This was the LR Marathon. It was Awesome!",
		id: "1",
		userId: "1"
	},
	{
		type: "short run",
		date: "12/24/2020",
		distance: "5.2 mile",
		pace: "10:31/mi",
		time: "45:58",
		notes: "This was a short rainy run",
		id: "2",
		userId: "1"
	},
	{
		type: "fast run",
		date: "6/24/2020",
		distance: "15.2 mile",
		pace: "8:31/mi",
		time: "34:58",
		notes: "This was a speed workout",
		id: "3",
		userId: "2"
	}
];

var users = [
	{ name: "CJ Roberts", age: 25, id: "1" },
	{ name: "Christina Oakley", age: 25, id: "2" }
];

const RunType = new GraphQLObjectType({
	name: "Run",
	fields: () => ({
		id: { type: GraphQLString },
		type: { type: GraphQLString },
		date: { type: GraphQLString },
		distance: { type: GraphQLString },
		pace: { type: GraphQLString },
		time: { type: GraphQLString },
		notes: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parentValue, args) {
				return _.find(users, { id: parentValue.userId });
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLString },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
		runs: {
			type: new GraphQLList(RunType),
			resolve(parentValue, args) {
				return _.filter(runs, { userId: parentValue.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		run: {
			type: RunType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				//code to get data from the db
				return _.find(runs, { id: args.id });
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return _.find(users, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
