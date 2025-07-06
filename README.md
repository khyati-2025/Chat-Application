# Secure Chat Application

A simple secure chat application built with Node.js and Express.js that allows users to register, log in, and exchange messages. This application features a user-friendly UI and supports message history and user authentication, storing data locally in JSON format.

## 🚀 Features

- User Sign Up and Login
- Secure message storage per user
- RESTful API endpoints for user and message handling
- View and manage personal chat history
- User deletion and message clearance options
- Frontend with clean chat UI and security (login) page

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Middleware**: Morgan, CORS
- **Database**: Local JSON file (`message.json`)

## 📁 Project Structure
├── app.js # Core Express application
├── server.js # Server entry point (must be created if not existing)
├── package.json # NPM configurations and dependencies
├── public/
│ ├── main.html # Main chat UI page
│ ├── securityPage.html# Login and Signup page
│ ├── style/ # CSS styles
│ └── logic/ # Client-side JavaScript logic
├── data/
│ └── message.json # Local database for users and their messages


## 🔐 API Endpoints

### Auth Routes

- `POST /api/v1/sign-up`  
  Registers a new user.

- `POST /api/v1/login`  
  Authenticates existing user.

### Message Routes

- `GET /api/v1/`  
  Fetch all users and messages (for debugging).

- `GET /api/v1/:user`  
  Get message history for a specific user.

- `POST /api/v1/message/:id`  
  Add a new message to a user's history.

- `DELETE /api/v1/messages/:id`  
  Delete all messages of a specific user.

- `DELETE /api/v1/:id`  
  Delete a user and their data.

- `DELETE /api/v1/messages`  
  Delete all messages for all users.

## 🧪 How to Run the Project

1. **Clone the Repository**

git clone https://github.com/your-username/chat-app.git
cd chat-app

2. **Install Dependencies**

npm install express, nodemon, dotenv, morgan, cors

3. **Start the development Server**

npm run start:dev

4. **Open the browser and navigate this**

http:localhost:3000/public/securityPage.html

## ✍️ Author
Name – khyati-2025
