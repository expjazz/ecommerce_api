const { gql } = require('apollo-server');

const mutation = gql`
  type Mutation {
    signUp(user: UserInput): User
    login(email: String!, password: String!): User
    updateUser(id: String, user: UserInput): User
    deleteUser(id: String): User
    createItem(item: ItemInput, ownerId: String): Item
    updateItem(id: String, item: ItemInput): Item
    deleteItem(id: String): Item
  }

  input UserInput {
    email: String
    password: String
  }

  input ItemInput {
    price: String
  }
`;

module.exports = mutation;
