const { gql } = require('apollo-server');

const mutation = gql`
  type Mutation {
    createUser(user: UserInput): User
    updateUser(id: String, user: UserInput): User
    deleteUser(id: String): User
    createItem(item: ItemInput, ownerId: String): Item
    updateItem(id: String, item: ItemInput): Item
    deleteItem(id: String): Item
  }

  input UserInput {
    email: String
  }

  input ItemInput {
    price: String
  }
`;

module.exports = mutation;
