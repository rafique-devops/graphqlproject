const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  type POST {
    title: String!,
    content: String!,
    author: String!,
  }

  type Query {
    todos: [Todo!]!
    posts: [POST]
  }
  
  input UpdatePostInput {
    title: String
    content: String
    author: String
  }

  input DeletePostInput{
    id: ID!
  }

  type Mutation {
    createTodo(title: String!, description: String!): Todo!
    createPost(title: String!, content: String!, author: String!): POST! 
    updatePost(id: ID!, input: UpdatePostInput!): POST
    deletePost(id: ID!): ID
  }
`;

module.exports = typeDefs;
