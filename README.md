# **YAVAR HACKATHON**

## TITLE: Taskify - A Task Management Application

## SCOPE 
**Front-end**: Develop a web application where users can manage their tasks.
**Back-end**: Implement a server to handle user authentication and task management.
**Database**: Utilize a database to store user information and tasks.

## TASK GIVEN

1) *Front-end Development (ReactJS)*:
    - Create a login page with input fields for username and password
    - Design a dashboard where users can view, add, edit, mark done, delete tasks
    - Implement responsiveness to ensure the application works well on different devices

2) *Back-end development*:
    - Set up a Node.js server using Express.js framework.
    - Implement RESTful APIs for user authentication (signup, login) and task management (create, read, update, delete, mark as done tasks).
    - Connect the server to a database (PostgreSQL) to store user credentials and tasks.

# WORK PROGRESS

## Creating a React App

Create a new React application using Create React App, a popular tool for bootstrapping React projects.

## Prerequisites

Before start, make sure the following are installed on machine:
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.22.x)

## Step 1: Install Create React App

To create a new React application, need to install Create React App globally. Run the following command in your terminal:

```
npm install -g create-react-app
```

## Step 2: Create a New React App
Once Create React App is installed, create a new React application by running the following command:

```
npx create-react-app my-react-app
```
Replace my-react-app with the desired name for your application.

## Step 3: Navigate to App Directory

After the application is created, navigate into project directory:

```
cd my-react-app
```

## Step 4: Start the Development Server

To start the development server and view React application in the browser, run:

```
npm start
```

This will open default web browser and display React application running at http://localhost:3000.

## Step 5: Building Application
When ready to deploy React application, create a production build using:

```
npm run build
```

This command will create an optimized production build of application in the build folder.

### App.js

Started to design the task page, which will be shown only authenticated.
- imported **Auth.js**, **ListHeader.js**, **ListItem.js** to display the task App page
- used `react-toastify` to receive toast notifications
- used *useState* and *useHook* to manage side effects and state in functional components from React Library
- used *useCookie* hook from `react-cookie` to allow component to read, write, remove cookies from browser

###