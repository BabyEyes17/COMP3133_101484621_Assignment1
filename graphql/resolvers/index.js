const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const resolvers = {


    
    Query: {

        login: async (_, { input }) => {
            
            const { username, email, password } = input;

            const user = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (!user) {
                return { success: false, message: "User not found" };
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return { success: false, message: "Invalid password" };
            }

            return {
                success: true,
                message: "Login successful",
                user
            };
        }

    },



    Mutation: {

        signup: async (_, { input }) => {
            
            const { username, email, password } = input;

            const existing = await User.findOne({
                $or: [{ username }, { email }]
            });

            if (existing) {
                return { success: false, message: "User already exists" };
            }

            const hashed = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashed
            });

            return {
                success: true,
                message: "Signup successful",
                user
            };
        }

    }

};

module.exports = resolvers;
