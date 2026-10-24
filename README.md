# Task Management System

A simple, responsive Task Management System built with HTML, CSS, and Vanilla JavaScript. This project was developed as part of the Nexus Backend JavaScript Project to strengthen JavaScript fundamentals before learning backend development with Node.js.

## Project Overview

The Task Management System helps users organize their daily activities by creating, updating, deleting, searching, and tracking tasks. It uses browser LocalStorage to save tasks so that they remain available after refreshing the page.

## Features

- **Create Tasks:** Add tasks with a title, description, and priority.
- **Update Tasks:** Edit existing task information.
- **Delete Tasks:** Remove tasks with a confirmation prompt.
- **Task Completion:** Mark tasks as completed or pending.
- **Task Filtering:** Filter tasks by All, Completed, or Pending.
- **Search Tasks:** Search tasks by title or description.
- **Task Priority:** Assign Low, Medium, or High priority.
- **Task Statistics:** View total, completed, and pending tasks, along with the completion rate.
- **LocalStorage:** Save tasks in the browser and retain them after refreshing.
- **Input Validation:** Prevent invalid task information.
- **Error Handling:** Handle storage and task-related errors.
- **Dark Mode:** Switch between light and dark themes.
- **Responsive Design:** Use the application on desktop, tablet, and mobile screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JavaScript)
- JavaScript ES Modules
- Browser DOM API
- LocalStorage
- JSON
- Git and GitHub

## Project Structure

```text
task-management-system/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── task.js
│   ├── storage.js
│   └── validation.js
│
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Open the Project

Open the project folder in Visual Studio Code.

### 3. Run the Application

Because the project uses JavaScript ES modules, run it using a local development server.

1. Install the **Live Server** extension in VS Code.
2. Open `index.html`.
3. Right-click inside the editor.
4. Select **Open with Live Server**.

The application will open in your default browser.

## How to Use

1. Enter a task title.
2. Add a description if needed.
3. Select a priority level.
4. Click **Add task**.
5. Use the task buttons to edit, complete, or delete tasks.
6. Search for tasks using the search field.
7. Filter tasks by their completion status.
8. View your task statistics at the top of the page.
9. Toggle dark mode when desired.

Your tasks are saved automatically in the browser's LocalStorage.

## JavaScript Concepts Practiced

This project provides practical experience with:

- Variables and data types
- Arrays and objects
- Functions and arrow functions
- Array methods such as `map()`, `filter()`, `find()`, and `some()`
- Conditional statements and loops
- DOM manipulation
- Event handling and event delegation
- JavaScript modules using `import` and `export`
- JSON serialization and parsing
- LocalStorage
- Input validation
- Error handling with `try...catch`
- Separation of concerns and reusable functions
- Basic application state management

## Code Organization

The project separates responsibilities across four JavaScript modules:

- **`app.js`:** Connects the modules, handles user interactions, and updates the interface.
- **`task.js`:** Contains functions for creating, updating, deleting, completing, searching, filtering, and calculating task statistics.
- **`storage.js`:** Handles saving and loading tasks using LocalStorage.
- **`validation.js`:** Validates task titles, descriptions, and priorities.

This structure makes the code easier to understand, test, and maintain.

## Data Storage

The application uses the browser's LocalStorage to persist task data.

Tasks are converted into JSON strings before saving and parsed back into JavaScript objects when loading.

**Note:** LocalStorage is browser-specific storage. Data is not automatically synchronized across devices or users, and it should not be treated as secure storage for sensitive information.

## Project Goals

The main goal is to strengthen JavaScript programming skills and build a foundation for backend development with Node.js.

The project emphasizes:

- Problem-solving and logic building
- Managing data with arrays and objects
- Writing reusable functions
- Organizing code into modules
- Handling user input and errors
- Practicing clean code principles

## Future Improvements

Possible future enhancements include:

- Task categories
- Task deadlines and due-date reminders
- Exporting tasks as JSON
- Improved accessibility
- Automated unit tests
- Converting the application into a Node.js REST API
- Integrating a database for persistent server-side storage

## Author

**Neima Alemu**

Software Engineering Student | JavaScript Learner

## License

This project was created for educational and learning purposes.
