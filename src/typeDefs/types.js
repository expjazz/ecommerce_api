const { gql } = require('apollo-server');

const types = gql`
  type Item {
    price: String
    owner: User
  }
  type User {
    id: ID!
    email: String
    password: String
    active: Boolean
    items: [Item]
  }
`;

module.exports = types;
