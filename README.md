```markdown
# To-Do List Application

This is a simple To-Do List application built using Node.js, Express.js, and MongoDB. The app allows users to create, delete, and manage their tasks with a clean, easy-to-use interface.

## Features

- **Add Tasks:** Users can add new tasks to their to-do list.
- **Delete Tasks:** Users can delete completed tasks.
- **Custom Lists:** Users can create custom to-do lists for different tasks or projects.
- **Date-Based Lists:** The homepage displays a to-do list specific to the current day.
- **EJS Templating:** The application uses EJS as the templating engine for dynamic HTML rendering.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud-based, such as MongoDB Atlas)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bibin2434/SecuringData.git
   cd SecuringData
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```bash
   mongourl=mongodb+srv://<username>:<password>@cluster.mongodb.net/todoListDB?retryWrites=true&w=majority
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## Usage

- Visit the home page at `http://localhost:3000` to view your daily to-do list.
- To add a new task, enter the task in the input field and click the "+" button.
- To delete a task, click the checkbox next to the task.
- To create a custom list, append the list name to the URL, for example, `http://localhost:3000/work` will create a "Work" to-do list.

## Code Structure

- **`app.js`:** The main server file that sets up routes, connects to MongoDB, and handles requests.
- **`views/`:** Contains EJS templates for rendering HTML pages.
- **`public/`:** Contains static files such as CSS and images.
- **`models/`:** Defines Mongoose schemas and models for `Item` and `List`.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tasks and lists.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **EJS**: Embedded JavaScript templating engine.
