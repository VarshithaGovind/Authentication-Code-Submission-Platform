Authentication & Code Submission Platform

A full-stack web application designed to handle user authentication, coding question submissions, and real-time code evaluation using the Judge0 API.

Tech Stack
Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- dotenv
- Axios (for Judge0 API requests)

Frontend (more will be specified by team mate)
- HTML
- CSS
- JavaScript

Tools & Services
- [Judge0 API](https://rapidapi.com/judge0-official/api/judge0-ce/) (via RapidAPI) — For code compilation and execution
- RapidAPI — API Marketplace
- MongoDB Compass — Database management






Project Structure

Authentication123/
├── Backend/
│ ├── db/
│ │ └── progress.json
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ └── user.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── exercises.js
│ │ ├── progress.js
│ │ └── submission.js
│ ├── utils/
│ │ └── runcode.js
│ ├── .env
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
├── Frontend/
│ └── index.html, styles.css, script.js (etc.)

 Setup Instructions
Prerequisites
- Node.js & npm installed
- MongoDB installed and running locally
- A RapidAPI account and access to the Judge0 API

Installation

npm install
Configure environment variables
Create a .env file inside the Backend/ directory with the following content:
MONGO_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=123456!@#$
RAPIDAPI_KEY=3717b1e3a9msh32a4b53bb66beccp1958e1jsn224c476d8f4b
Start the backend server
node server.js
Open the frontend
You can simply open the Frontend/index.html file in a browser or use Live Server in VS Code.

Project Flow 
1.User Registration/Login
→ User signs up or logs in.
→ JWT token is generated for authentication.

2.Fetch Coding Questions
→ Authenticated user gets a list of coding problems.

3.Write & Submit Code
→ User writes code and submits it for a selected question.

4.Code Execution (Judge0 API)
→ Backend sends code to Judge0 API for execution.
→ Output is received and compared with test cases.

5.Store Submission Result
→ Result (pass/fail) is stored in progress.json.

6.View Progress
→ User can view their solved/unsolved problems.

7.JWT-Protected Routes
→ Only logged-in users can access submissions, exercises, and progress.

Team Members
Name	                  Role
Govind Varshitha	      Backend Developer
Krishna Vamshi Gopu   	Frontend Developer
