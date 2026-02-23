# Employee Management System

## Overview
This project is a GraphQL-based backend application using NodeJS, Express, GraphQL, Cloudinary, and MongoDB. Functionality of this application includes user signup, login, and employee CRUD operations including image upload.

## Developer
Jayden Lewis<br>
Student ID: 101484621<br>

## Tech Stack

### Backend

- Node.js
- Express.js
- Apollo Server Express

### Database

- MongoDB Atlas
- Mongoose

### Authentication & security

- JSON Web Tokens
- bcrypt

### File upload & media

- Cloudinary

### Middleware & utilities

- dotenv
- cors
- express-validator

### Core libraries

- graphql

## Validation Rules


## Project Setup

### Clone the repository
```bash
git clone https://github.com/BabyEyes17/COMP3133_101484621_Assignment1
cd COMP3133_101484621_Assignment1
```

### Install required dependencies
```bash
npm install
```

### Create a .env file in the project root with the following environment variables
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running The Project

### Start the server
```bash
npm start
```

### GraphQL endpoint
`http://localhost:4000/graphql`

### Sample user login
Username: "user"<br>
Password: "password"

## Example GraphQL Operations

### Signup
```graphql
mutation {
  signup(input: {
    username: "user"
    email: "user@gmail.com"
    password: "password"
  }) {
    success
    message
    user { _id username email }
  }
}
```

### Login
```graphql
query {
  login(input: {
    username: "user"
    password: "password"
  }) {
    success
    message
    user { username email }
  }
}
```

### Add employee
```graphql
mutation {
  addEmployee(input: {
    first_name: "Nathan"
    last_name: "Wolf"
    email: "nathan.wolf@gmail.com"
    gender: "Male"
    designation: "Software Engineer"
    salary: 3250
    department: "IT"
    employee_photo: "https://picsum.photos/900"
    date_of_joining: "2026-01-01"
  }) {
    success
    message
    employee {
      _id
      first_name
      email
      salary
      date_of_joining
      employee_photo
    }
  }
}
```

### Get all employees
```graphql
query {
  
    getAllEmployees {
        _id
        first_name
        last_name
        email
    }
}
```

