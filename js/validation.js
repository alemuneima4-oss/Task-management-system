
const ALLOWED_PRIORITIES = ["Low", "Medium", "High"];

export function validateTaskInput(title, description, priority) {
    if (typeof title !== "string" || !title.trim()) {
        return "Task title is required.";
    }

    if (title.trim().length > 100) {
        return "Task title cannot exceed 100 characters.";
    }

    if (typeof description !== "string") {
        return "Description must be valid text.";
    }

    if (description.length > 500) {
        return "Description cannot exceed 500 characters.";
    }

    if (!ALLOWED_PRIORITIES.includes(priority)) {
        return "Please select a valid priority.";
    }

    return "";
}
