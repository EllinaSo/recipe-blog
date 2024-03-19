# Recipe Blog - Full Stack MERN Project (In progress)

### Overview

This project is a blog MERN application that allows admin to post recipes. The purpose of this project is learning MERN stack. This project was created by following [React & Next js Projects with Sahand channel's tutorial](https://www.youtube.com/watch?v=Kkht2mwSL_I) with desired improvements. Functionality:

- **Sign in / Sign up page**: Email + Password or Google OAuth 
- **Home page**: banner and list of recent recipes
- **New recipe page** (only for Admin user)
- **Dashboard Section**:
-- **User profile page**: changing user data such as email, avatar and etc. 
-- **Recipe list**: list with all user's recipes with action buttons 

### Technologies and Tools

- MongoDB Atlas Database
- Express.js
- Node.js
- Firebase
- React.js
- Material UI
- React Context
- React Router Dom
- Axios hooks

### How to Run

Clone the repository, it contains both client and server code.

##### Client

1. In terminal move to `client` folder and install dependencies with `pnpm i` command.
2. Create a `.env` file in the directory and fill it according to the `.env.example` file. You might need to create a project on the [Firebase console](https://console.firebase.google.com/u/0/) to get `VITE_FIREBASE_API_KEY`.
3. Start server with `pnpm dev` command. It will open page [http://localhost:5173/](http://localhost:5173/) automatically.

##### Server

1. In terminal move to `server` folder and install dependencies with `pnpm i` command.
2. Create a `.env` file in the directory and fill it according to the `.env.example` file. You might need to create an account on the [MongoDB Atlas Database site](https://www.mongodb.com/atlas/database) to get `MONGODB_CONNECTION_STRING`.
3. Start server with `pnpm dev` command. It will start on [http://localhost:5000](http://localhost:5000) by default.
