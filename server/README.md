# Backend - Todo Manager App

This is the backend part of the **Todo Manager Webpage**, which is a full-stack to-do management application. The backend is built using **Express.js** and **MongoDB**, and it provides user authentication, task management, and other core functionalities.

## Features
- **User Authentication**: Secure login and registration using JWT tokens stored in HttpOnly cookies.
- **Task Management**: Perform CRUD (Create, Read, Update, Delete) operations for tasks.
- **Auto Logout**: The system automatically logs out users after 30 minutes of inactivity.
- **Secure Cookie Storage**: JWT tokens are stored in HttpOnly cookies to ensure security.
  
## Tech Stack
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) & Cookies
- **CORS**: Handles cross-origin requests between frontend and backend