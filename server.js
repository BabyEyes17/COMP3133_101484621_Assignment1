require("dotenv").config();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const typeDefs = gql`
    
    type Query {
        hello: String
    }
`;

const resolvers = {
    
    Query: {
        hello: () => "Server is working!",
    },
};

async function startServer() {
    
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, async () => {
    
        const url = "http://localhost:4000/graphql";
        console.log(`Server running at ${url}`);
    
        // Automatically open webpage
        console.log(`Opening ${url} in your browser.`)
        require("child_process").exec(`start ${url}`);
    });
}

startServer();
