const express = require('express');
const { ApolloServer , gql} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mysql = require('mysql2/promise');
const { Pool } = require('pg');
require('dotenv').config();
// // Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

console.log(pool);

async function startApolloServer() {
    // const typeDefs = gql`
    //   type Query {
    //     hello: String
    //   }
    // `;
  
    // const resolvers = {
    //   Query: {
    //     hello: () => 'Hello, world!',
    //   },
    // };
  
    const server = new ApolloServer({ typeDefs, resolvers });
  
    await server.start();
  
    const app = express();
  
    server.applyMiddleware({ app });
  
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  }
  
  startApolloServer().catch((err) => console.error(err));