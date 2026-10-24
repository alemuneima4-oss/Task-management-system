import {
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskStats,
    filterTasks
} from "./task.js";

import { loadTasks, saveTasks } from "./storage.js";

import { validateTaskInput } from "./validation.js";

// Select HTML elements
const categoryInput = document.getElementById("task-category");                                                                    
const taskForm = document.getElementById("task-form");
const taskIdInput = document.getElementById("task-id");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const priorityInput = document.getElementById("task-priority");
const formHeading = document.getElementById("form-heading");
const submitButton = document.getElementById("submit-button");
const cancelEditButton = document.getElementById("cancel-edit");
const formMessage = document.getElementById("form-message");

const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskCountLabel = document.getElementById("task-count-label");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");
const completionRate = document.getElementById("completion-rate");

const themeToggle = document.getElementById("theme-toggle");

// Application data
let tasks = loadTasks();

// Show a message to the user
function showMessage(message, isError = true) {
    formMessage.textContent = message;
    formMessage.style.color = isError ? "var(--danger)" : "#16a34a";
}

// Save changes before updating the application state
function persistTasks(nextTasks) {
    if (!saveTasks(nextTasks)) {
        showMessage(
            "Could not save changes. Check your browser storage settings."
        );
        return false;
    }

    tasks = nextTasks;
    return true;
}

// Reset the form to create mode
function resetForm() {
    taskForm.reset();
    taskIdInput.value = "";
    priorityInput.value = "Medium";

    formHeading.textContent = "Create a task";
    submitButton.textContent = "Add task";
    cancelEditButton.hidden = true;

    showMessage("");
}

// Create a button safely
function createButton(text, action, id, className = "") {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = text;
    button.dataset.action = action;
    button.dataset.id = id;

    if (className) {
        button.className = className;
    }

    return button;
}

// Create one task card without inserting user input as HTML
function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";

    if (task.completed) {
        card.classList.add("completed");
    }

    const header = document.createElement("div");
    header.className = "task-card-header";

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;

    const priority = document.createElement("span");
    priority.className =
        `priority priority-${task.priority.toLowerCase()}`;
    priority.textContent = `${task.priority} priority`;

    
    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = task.category || "Other";

    header.append(title, priority);
    card.appendChild(header);
    card.appendChild(category);


    if (task.description) {
        const description = document.createElement("p");
        description.className = "task-description";
        description.textContent = task.description;
        card.appendChild(description);
    }

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const status = document.createElement("span");
    status.className = "status-label";
    status.textContent = task.completed ? "Completed" : "Pending";

    const created = document.createElement("span");

    const date = new Date(task.createdAt);
    created.textContent = Number.isNaN(date.getTime())
        ? "Date unavailable"
        : `Created: ${date.toLocaleDateString()}`;

    meta.append(status, created);
    card.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    actions.appendChild(
        createButton(
            task.completed ? "Mark pending" : "Complete",
            "toggle",
            task.id
        )
    );

    actions.appendChild(
        createButton("Edit", "edit", task.id)
    );

    actions.appendChild(
        createButton("Delete", "delete", task.id, "delete-button")
    );

    card.appendChild(actions);

    return card;
}

// Update statistics displayed on the page
function renderStatistics() {
    const stats = getTaskStats(tasks);

    totalCount.textContent = stats.total;
    completedCount.textContent = stats.completed;
    pendingCount.textContent = stats.pending;
    completionRate.textContent = `${stats.completionRate}%`;
}

// Display tasks according to the search and filter
function renderTasks() {
    const visibleTasks = filterTasks(
        tasks,
        filterSelect.value,
        searchInput.value
    );

    taskList.replaceChildren();

    visibleTasks.forEach(task => {
        taskList.appendChild(createTaskCard(task));
    });

    emptyState.hidden = visibleTasks.length > 0;

    taskCountLabel.textContent =
        `${visibleTasks.length} of ${tasks.length} task(s) shown`;

    renderStatistics();
}

// Handle creating and updating tasks
taskForm.addEventListener("submit", event => {
    event.preventDefault();
    const category = categoryInput.value;
    const title = titleInput.value.trim();
    const description = descriptionInput.value;
    const priority = priorityInput.value;
    const editingId = taskIdInput.value;

    const validationError = validateTaskInput(
        title,
        description,
        priority
    );

    if (validationError) {
        showMessage(validationError);
        titleInput.focus();
        return;
    }

    let nextTasks;

    try {
        if (editingId) {
            const taskExists = tasks.some(
                task => task.id === editingId
            );

            if (!taskExists) {
                showMessage("This task no longer exists.");
                resetForm();
                renderTasks();
                return;
            }

            nextTasks = updateTask(tasks, editingId, {
                title,
                description,
                priority,
                category
            });
        } else {
            const newTask = createTask(
                title,
                description,
                priority,
                category
            );

            nextTasks = [...tasks, newTask];
        }
    } catch (error) {
        console.error("Task operation failed:", error);
        showMessage("Something went wrong. Please try again.");
        return;
    }

    if (!persistTasks(nextTasks)) {
        return;
    }

    resetForm();
    renderTasks();

    showMessage(
        editingId ? "Task updated successfully!" : "Task added successfully!",
        false
    );
});

// Handle task buttons using event delegation
taskList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button || !taskList.contains(button)) {
        return;
    }

    const { action, id } = button.dataset;
    const task = tasks.find(item => item.id === id);

    if (!task) {
        showMessage("Task not found. Please refresh the page.");
        return;
    }

    if (action === "edit") {
        taskIdInput.value = task.id;
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        priorityInput.value = task.priority;

        categoryInput.value = task.category || "Other";

        formHeading.textContent = "Edit task";
        submitButton.textContent = "Save changes";
        cancelEditButton.hidden = false;

        showMessage("");
        titleInput.focus();

        document.getElementById("task-form").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;
    }

    if (action === "delete") {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        const nextTasks = deleteTask(tasks, id);

        if (persistTasks(nextTasks)) {
            if (taskIdInput.value === id) {
                resetForm();
            }

            renderTasks();
            showMessage("Task deleted successfully.", false);
        }

        return;
    }

    if (action === "toggle") {
        const nextTasks = toggleTaskCompletion(tasks, id);

        if (persistTasks(nextTasks)) {
            renderTasks();

            showMessage(
                task.completed
                    ? "Task marked as pending."
                    : "Task completed successfully.",
                false
            );
        }
    }
});

// Cancel editing
cancelEditButton.addEventListener("click", () => {
    resetForm();
});

// Search tasks as the user types
searchInput.addEventListener("input", renderTasks);

// Filter tasks
filterSelect.addEventListener("change", renderTasks);

// Toggle dark mode
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    themeToggle.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
});

// Display saved tasks when the application starts
renderTasks();