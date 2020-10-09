const { gql } = require('apollo-server');

const types = `

  type Item {
    price: String
    owner: User
  }
  type User {
    id: ID!
    email: String
  }
`;

module.exports = types;
