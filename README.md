# Job Portal - Full-Stack Application

## Overview

This project is a full-stack Job Portal application that allows users to register, log in, and access various features like profile management, submitting tasks, and generating reports. Admins can manage users and approve or reject signups. Additionally, the platform allows users to generate PDF reports and handle password recovery. 

This application uses a **Node.js + Express** backend with **MongoDB** for data storage and authentication via **JWT** (JSON Web Tokens). The **React.js** frontend manages user interactions with **Redux** handling state management. 

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Frontend](#frontend)
  - [Installation & Setup](#installation--setup-frontend)
  - [Key Components](#key-components)
- [Backend](#backend)
  - [Installation & Setup](#installation--setup-backend)
  - [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)

---

## Technologies Used

### Frontend:
- **React.js** - Library for building the user interface
- **Redux** - State management
- **React Router** - Handling navigation and routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Styling the application
- **Toastify** - For notification handling
- **React Hooks** (useState, useEffect) - Functional component state and lifecycle management

### Backend:
- **Node.js** - Server-side JavaScript environment
- **Express.js** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ORM for MongoDB
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **Bcrypt.js** - Password hashing
- **PDFKit or html-pdf** - PDF generation

---

## Project Structure

### Frontend Structure:
```bash
src/
│
├── components/         # Reusable UI components (Forms, Headers, Footers)
│   ├── dashboard/      # Dashboard components for users
│   ├── form/           # Form-related components
│   └── home/           # Homepage components
│
├── features/           # Redux slices for state management
│   └── authSlice.jsx   # Contains all auth-related async functions and state
│
├── pages/              # Page-level components for Login, Signup, etc.
│   ├── Login.jsx
│   └── Signup.jsx
│
├── App.jsx             # Main component where routes are defined
└── index.js            # Entry point of the frontend
```

### Backend Structure:
```bash
backend/
│
├── controllers/        # Controller logic for handling requests
│   ├── authController.js  # Authentication-related logic
│   └── pdfController.js   # PDF generation logic
│
├── models/             # Mongoose models for MongoDB collections
│   └── User.js
│
├── routes/             # API routes
│   ├── authRoutes.js      # Routes for login, signup, password reset
│   └── pdfRoutes.js       # Routes for generating and downloading PDFs
│
├── middleware/         # Middleware for token authentication
│   └── authMiddleware.js
│
├── utils/              # Utility functions for email handling, etc.
│   └── email.js
│
├── app.js              # Main Express server configuration
└── server.js           # Server start-up
```

---

## Features

### User Authentication:
- **Signup**: Users can create an account by providing their details (name, email, phone, password).
- **Login**: Users can log in using their email and password.
- **JWT-Based Authentication**: Tokens are used to manage user sessions.
- **Logout**: Users can log out from their account.

### Role-Based Access Control:
- **Admin**: Can view all users and approve or reject their requests.
- **User**: Access to tasks and PDF generation.

### Password Management:
- **Forgot Password**: Users can request a password reset link via email.
- **Reset Password**: Users can reset their password using a token.

### PDF Generation:
- **User-Specific PDFs**: Allows users to generate PDFs containing dynamic data like tasks or reports.
- **Downloadable Reports**: PDFs can be downloaded for further use.

---

## Frontend

### Installation & Setup (Frontend)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/DK-HR-Task-PDF-download-and-creation.git
   cd job-portal/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`.

### Key Components

- **Login Page (`Login.jsx`)**:
  - Allows users to log in using their email and password.
  - Uses `loginuserAsync` thunk to dispatch login requests to the server.

- **Signup Page (`Signup.jsx`)**:
  - Allows users to create an account.
  - Uses `createuserAsync` thunk to dispatch signup requests.

- **Auth Slice (`authSlice.jsx`)**:
  - Handles asynchronous requests for authentication, such as login, signup, logout, and password management.
  - Manages the Redux state for authentication (isAuthenticated, user, loading).

- **PDF Download**:
  - Triggered from the user's dashboard to generate downloadable PDF reports based on user-specific data.

### Frontend Routing:

- **`/`**: Home page
- **`/login`**: Login page
- **`/signup`**: Signup page
- **`/dashboard`**: User dashboard (only accessible after login)
- **`/filltheform`**: Task form page for users
- **`/forgetpassword`**: Forgot password page
- **`/user/resetPassword`**: Password reset page

---

## Backend

### Installation & Setup (Backend)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following environment variables:
   ```bash
   PORT=8080
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   EMAIL_SERVICE=<Email service for sending emails>
   EMAIL_USER=<Your email username>
   EMAIL_PASS=<Your email password>
   ```

4. Start the server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:8080`.

### API Endpoints

#### Authentication Endpoints:
- **`POST /api/signup`**: Create a new user account.
- **`POST /api/login`**: Log in an existing user and return a JWT token.
- **`POST /api/logout`**: Log out the user.
- **`POST /api/forgotPassword`**: Send password reset email with a token.
- **`POST /api/resetPassword`**: Reset user password using the token.

#### PDF Endpoints:
- **`GET /api/download-pdf`**: Generates and returns a PDF report for the logged-in user.

#### Other Endpoints:
- **`GET /api/validateToken`**: Validate if a user's token is still valid.

---

## Environment Variables

Create a `.env` file in the backend directory and set the following values:

```env
PORT=8080
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
EMAIL_SERVICE=<Email service provider>
EMAIL_USER=<Your email username>
EMAIL_PASS=<Your email password>
```

---

## Future Improvements

- **Two-Factor Authentication**: Enhance security by adding 2FA during login.
- **Admin Dashboard**: Implement a dedicated dashboard for admins to manage users, tasks, and reports.
- **Task Management**: Extend user functionality to allow task updates, comments, and progress tracking.
- **Analytics**: Add data visualization features for user statistics and performance.
- **Unit Testing**: Implement unit and integration tests using Jest or Mocha for the backend and React Testing Library for the frontend.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
