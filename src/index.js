const { GraphQLServer } = require('graphql-yoga');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

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

const opts = {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'],
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (request) => ({ ...request }),
});

server.express.use(cookieParser());
server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    console.log('here');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.start(opts, (port) => console.log(`server starts at ${port.port}`));
