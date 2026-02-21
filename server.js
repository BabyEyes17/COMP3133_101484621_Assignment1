require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();



// Graphql testing
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



// Starting the server
async function startServer() {
    


    // Connecting to MongoDB
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI is missing from the .env file.")
    }

    await mongoose.connect(uri)
    console.log("Connected to MongoDB Atlas.")



    // Starting Apollo
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });



    // Starting Express
    const port = process.env.port || 4000;

    app.listen(4000, async () => {
    
        const url = "http://localhost:4000/graphql";
        console.log(`Server running at ${url}`);
    
        // Automatically open webpage
        console.log(`Opening ${url} in your browser.`)
        require("child_process").exec(`start ${url}`);
    });
}



startServer().catch((err) => {
    console.error("Startup error:", err.message);
});
