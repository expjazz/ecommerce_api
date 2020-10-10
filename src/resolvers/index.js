const userResolver = require('./userResolver');

const itemResolver = require('./itemResolver');

const resolvers = [userResolver, itemResolver];

module.exports = resolvers;
