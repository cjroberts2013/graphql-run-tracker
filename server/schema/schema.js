const graphql = require("graphql");
const Run = require("../models/run");
const User = require("../models/user");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull
} = graphql;

const _ = require("lodash");

const RunType = new GraphQLObjectType({
	name: "Run",
	fields: () => ({
		id: { type: GraphQLID },
		type: { type: GraphQLString },
		date: { type: GraphQLString },
		distance: { type: GraphQLString },
		pace: { type: GraphQLString },
		time: { type: GraphQLString },
		notes: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parentValue, args) {
				//return _.find(users, { id: parentValue.userId });
				return User.findById(parentValue.userId);
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
		runs: {
			type: new GraphQLList(RunType),
			resolve(parentValue, args) {
				//return _.filter(runs, { userId: parentValue.id });
				return Run.find({ userId: parentValue.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		run: {
			type: RunType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				//code to get data from the db
				//return _.find(runs, { id: args.id });
				return Run.findById(args.id);
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				//return _.find(users, { id: args.id });
				return User.findById(args.id);
			}
		},
		runs: {
			type: new GraphQLList(RunType),
			resolve(parentValue, args) {
				//return runs;
				return Run.find({});
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				//return users;
				return User.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				let user = new User({
					name: args.name,
					age: args.age
				});
				return user.save();
			}
		},
		addRun: {
			type: RunType,
			args: {
				type: { type: GraphQLNonNull(GraphQLString) },
				date: { type: GraphQLNonNull(GraphQLString) },
				distance: { type: GraphQLNonNull(GraphQLString) },
				pace: { type: GraphQLNonNull(GraphQLString) },
				time: { type: GraphQLNonNull(GraphQLString) },
				notes: { type: GraphQLNonNull(GraphQLString) },
				userId: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				let run = new Run({
					type: args.type,
					date: args.date,
					distance: args.distance,
					pace: args.pace,
					time: args.time,
					notes: args.notes,
					userId: args.userId
				});
				return run.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
