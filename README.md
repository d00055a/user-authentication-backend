# User Authentication System (Backend)

## Overview

This repository contains the backend REST API for the User Authentication System.  
The backend was developed independently as part of a remote Web Development Internship at Codveda Technologies.

It provides secure authentication and authorization using JWT, handles user data storage, and exposes protected API endpoints consumed by the React frontend.

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Authentication via httpOnly cookies
- Protected API routes
- Authenticated user data retrieval
- Logout functionality

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt

## API Endpoints

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate user |
| POST | `/logout` | Logout user |
| GET | `/me` | Get authenticated user data |
| GET | `/secret` | Protected route |

## Authentication Flow

- User credentials are validated on login
- Passwords are hashed using bcrypt
- JWT is generated and stored in an httpOnly cookie
- Protected routes verify authentication using the JWT

## Run Locally

```bash
git clone https://github.com/d00055a/user-authentication-backend.git
cd user-authentication-backend
npm install
```

- Create a **.env** file:

```Env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
- Run the server:

```bash
npm run dev
```

## Deployment

The backend is deployed on Render and connected to the frontend via REST API.

## Purpose

This backend was built to:

- Implement secure authentication logic

- Demonstrate REST API design

- Practice backend security best practices

- Support a real-world frontend application


