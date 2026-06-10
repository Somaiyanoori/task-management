# Full-Stack Task Management Application

This is a simple, full-stack task management application built as a technical assessment. It includes a RESTful API backend built with Node.js and Express, a PostgreSQL database, and a responsive frontend UI built with React and Vite.

## Features

-   Create, list, and update tasks.
-   RESTful API for task management.
-   Clean, component-based UI.
-   Persistent data storage in a PostgreSQL database.

## Project Structure

This project uses a monorepo structure containing two main packages:

-   `./task-management-api`: The Node.js/Express API server.
-   `./task-management-ui`: The React UI client.

---

## Getting Started: Local Setup

To run this project on your local machine, you will need **Node.js** and **PostgreSQL** installed.

### 1. Backend Setup

First, set up and run the backend server.

```bash
# 1. Navigate to the backend directory
cd task-management-api

# 2. Install dependencies
npm install

# 3. Set up the PostgreSQL database
#    a. Create a new PostgreSQL database named 'task_manager'.
#    b. Connect to this database using a tool like pgAdmin or psql.
#    c. Run the SQL script located in task-management-api/database.sql to create the table and trigger.

# 4. Configure environment variables
#    a. Create a new file named .env in the 'task-management-api' directory.
#    b. Add your database credentials:
#    
#    DB_USER=your_postgres_user
#    DB_HOST=localhost
#    DB_DATABASE=task_manager
#    DB_PASSWORD=your_postgres_password
#    DB_PORT=5432

# 5. Run the backend server
npm run dev
The API server will now be running on http://localhost:3000. Leave this terminal running.

2. Frontend Setup
In a new terminal window, set up and run the frontend client.
# 1. Navigate to the frontend directory
cd task-management-ui

# 2. Install dependencies
npm install

# 3. Run the frontend development server
npm run dev
```
API Endpoints

The following endpoints are available on the backend server:

Method	Endpoint	Description	Request Body
 - GET	/tasks	Get all tasks	(none)
 - POST	/tasks	Create a new task	{ "title": "string" }
 - PATCH	/tasks/:id	Update a task's status	{ "status": "string" }
 - Note: The allowed values for status are to-do, in-progress, and done.
   
Author
Somaiya Noori
