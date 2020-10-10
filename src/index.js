const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();
const mongoose = require('mongoose');

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
};

const dbUri = `mongodb+srv://new_commerce_1:${db.pass}@cluster0.5l1di.mongodb.net/${db.name}?retryWrites=true&w=majority`;

const dbOptions = {
  userNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUri, dbOptions)
  .then(console.log('Database connected'))
  .catch((error) => console.log('Database failed: ', error));

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch((error) => console.log('Server failed:', error));
