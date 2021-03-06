const { gql } = require('apollo-server');

const query = gql`
  type Query {
    items: [Item]
    item(id: ID!): Item
    users: [User]
    user(id: ID!): User
    currentUser: User
  }
`;

module.exports = query;
