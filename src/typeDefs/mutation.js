const { gql } = require('apollo-server');

const mutation = gql`
  type Mutation {
    createUser(user: UserInput): User
    updateUser(id: String, user: UserInput): User
    deleteUser(id: String): User
    createItem(item: ItemInput): Item
    updateItem(id: String, item: ItemInput): Item
    deleteItem(id: String): Item
  }

  input UserInput {
    email: String
  }

  input ItemInput {
    price: String
    owner: UserInput
  }
`;

module.exports = mutation;
