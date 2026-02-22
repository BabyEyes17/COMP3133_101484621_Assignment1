const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Employee = require("../../models/Employee");
const cloudinary = require("../../utils/cloudinary");

const resolvers = {
    
    
    
    Query: {
        


        login: async (_, { input }) => {
            
            const { username, email, password } = input;

            const user = await User.findOne({
                $or: [{ username: username }, { email: email }]
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
        },



        getAllEmployees: async () => { 
            return await Employee.find().sort({ created_at: -1 });
        },



        searchEmployeeById: async (_, { id }) => {
            return await Employee.findById(id);
        },

        searchEmployeeByDeptOrDesignation: async (_, { department, designation }) => {
            
            const filters = [];

            if (department) filters.push({ department });
            if (designation) filters.push({ designation });

            if (filters.length === 0) return [];

            return await Employee.find({ $or: filters }).sort({ created_at: -1 });
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
        },



        addEmployee: async (_, { input }) => {
            
            let photoUrl = input.employee_photo || null;

            if (photoUrl) {
                
                const uploadResult = await cloudinary.uploader.upload(photoUrl, {
                    
                    folder: "comp3133/employees"
                });

                photoUrl = uploadResult.secure_url;
            }

            const employee = await Employee.create({
                
                ...input,
                employee_photo: photoUrl,
                date_of_joining: new Date(input.date_of_joining)
            });

            return employee;
        },


        
        updateEmployeeById: async (_, { id, input }) => {
            
            const update = { ...input };

            if (update.date_of_joining) {
                update.date_of_joining = new Date(update.date_of_joining);
            }

            if (update.employee_photo) {
                
                const uploadResult = await cloudinary.uploader.upload(update.employee_photo, {
                    folder: "comp3133/employees"
                });

                update.employee_photo = uploadResult.secure_url;
            }

            return await Employee.findByIdAndUpdate(id, update, { new: true });
        },


        
        deleteEmployeeById: async (_, { id }) => {
            return await Employee.findByIdAndDelete(id);
        }
    },



    Employee: {
        
        date_of_joining: (employee) => employee.date_of_joining ? employee.date_of_joining.toISOString() : null,
        
        created_at: (employee) => employee.created_at ? employee.created_at.toISOString() : null,
        
        updated_at: (employee) => employee.updated_at ? employee.updated_at.toISOString() : null,
    },



    User: {
        
        created_at: (user) => (user.created_at ? user.created_at.toISOString() : null),
        
        updated_at: (user) => (user.updated_at ? user.updated_at.toISOString() : null),
    }
};



module.exports = resolvers;
