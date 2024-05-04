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

# WORK PROGRESS - FRONT END

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

`App.js` essentially responsible for rendering main UI of application, managing authentication state, fetching task data, displaying toast notifications.
- imported **Auth.js**, **ListHeader.js**, **ListItem.js** to display the task App page
- used `react-toastify` to receive toast notifications
- used *useState* and *useHook* to manage side effects and state in functional components from React Library
- used *useCookie* hook from `react-cookie` to allow component to read, write, remove cookies from browser

### Auth.js

`Auth.js` responsible for rendering authentication form for logging in or signing up users
- used *useState* from React library
- used *useCookies* from `react-cookie`

### ListHeader.js

`ListHeader.js` serves as the header section for list containing list name, buttons for adding new items and signing out, modal for creating new items
- used `Modal` component, `useState` and `useCookies` hook

### ListItem.js

`ListItem.js` component represents an individual task item in list.
- using necessary dependencies `Modal`, `ProgressBar`, `CheckBox`
- `useState` hook for managing state
- `toast` from `react-toastify` for displaying toast notifications

### Modal.js

`Modal.js` responsible for displaying a modal for adding or editing a task
- enter task details, select progress, save task data
- `useState` from React for managing state
- `useCookies` hook from `reack-cookie` to access cookies
- `toast` from `react-toastify` for displaying toast notifications

### ProgressBar.js

`ProgressBar.js` generates progress bar with dynamically colored inner bar based on the progress value provided as a prop

### Checkbox.js

`CheckBox.js` represents a checkbox input element

### Dashboard.js

`Dashboard.js` represents main dashboard page of application
- uses Fragment, useState, useEffect hooks
- fetches and displays user's name from the server, provides logout button, handles user logout functionality

# WORK PROGRESS - BACK END

## Step 1: Initialize project directory

Create new directory for our project
```
mkdir my-server
```
Navigate to the project directory
```
cd my-server
```
Run to create `package.json` file 
```
npm init -y
```

## Step 2: Install Express

Install Express and add to your project's dependencies
```
npm install express
```

## Step 3: Create Express application

Create new `index.js` in project directory
Require `Express` at top of the file
```
const express = require('express');
//Create an instance of Express application
const app = express();
```

## Step 4: Start the server

Add following code to start the server on port
```
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Step 5: Run application
To run the application type into terminal or command prompt
```
node index.js
```
Or,
Use `nodemon` to automatically restart the server when file changes
```
npm install -g nodemon
```
```
nodemon index.js
```
Or,
```
npx nodemon index.js
```

### index.js

Set up basic Express server with routes for authentication, todo management allowing clients to interact with the server through a RESTful API

- Creates an Express application instance
- Configures middleware
- Defines routes
- Starts the server

### Routes

Routes specified are,

**Authentication controller routes**
> - **POST /signup**: This route is used for user sign up. When a POST request is made to /signup, it will invoke the signup function from the authController.
> - **POST /login**: This route is used for user login. When a POST request is made to /login, it will invoke the login function from the authController.

**Todo controller routes**
> - **GET /todos**: Retrieves all todos.
> - **POST /todos**: Creates a new todo.
> - **GET /todos/:id**: Retrieves a specific todo by its ID.
> - **PATCH /todos/:id**: Updates a specific todo by its ID.
> - **DELETE /todos/:id**: Deletes a specific todo by its ID.
> - **GET /todos/user/:id**: Retrieves todos specific to a user by their ID.
> - **PUT /todos/:id**: Updates the completion status of a specific todo by its ID.

### Controller

Controller files for handling CRUD operations related to todos and authentication (signup, login) control related

# WORK PROGRESS - DATABASE
- Used Postgres pgAdmin in local machine
- Create database `Taskify`
- Query is attached to `database.sql`

## FUTURE IMPROVEMENTS
1. Using email authentication
2. Creating dashboard to know the total tasks, completed tasks, pending tasks
3. Sending notification
4. Adding tags and categories to tasks
5. User profile settings
6. Collaboration features access by other users
7. Task prioritization
8. Feedback mechanism

## OUTPUT IMAGES ARE ADDED

All output images related to the project are stored in the `my-output` folder. Below is a brief description of each image:

- 1. Add task Data.png:  Image of add task with data
- 2. Add task Modal.png: Image of add task modal
- 3. Checked.png: Image with task checked
- 4. Dashboard data.png: Image of task Dashboard with data
- 5. Dashboard.png: Image of task dashboard
- 6. Delete Toast message.png: Toast message of delete task image
- 7. Edit page.png: Image of edit task modal
- 8. Login Data.png: Image of Login page with data
- 9. Login.png: Image of login page
- 10. Signup data.png: Image of signup page with data
- 11. Signup.png: Image of signup page
- 12. Update Toast message.png: Toast message of update task image

Feel free to refer to these images for reference or visual representation of the project output.
Click here to see the folder [my-output](my-output)