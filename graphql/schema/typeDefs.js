const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String!
        created_at: String
        updated_at: String
    }

    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String
        designation: String!
        salary: Float!
        department: String!
        employee_photo: String
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        username: String
        email: String
        password: String!
    }

    type AuthResponse {
        success: Boolean!
        message: String
        user: User
        token: String
    }

    type Query {
        login(input: LoginInput!): AuthResponse
    }

    type Mutation {
        signup(input: SignupInput!): AuthResponse
    }
`;

module.exports = typeDefs;
