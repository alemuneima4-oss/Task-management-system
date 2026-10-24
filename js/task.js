
const VALID_PRIORITIES = ["Low", "Medium", "High"];


export const VALID_CATEGORIES = [
    "Study",
    "Work",
    "Personal",
    "Other"
];

export function createTask(title, description, priority, category = "Other") {
    if (!VALID_PRIORITIES.includes(priority)) {
        throw new Error("Invalid task priority.");
    }

    if (!VALID_CATEGORIES.includes(category)) {
        throw new Error("Invalid task category.");
    }

    return {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };
}



export function updateTask(tasks, id, updates) {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }

        return {
            ...task,
            title: updates.title.trim(),
            description: updates.description.trim(),
            priority: updates.priority,
            category: updates.category || task.category || "Other",
            updatedAt: new Date().toISOString()
        };
    });
}


export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

export function toggleTaskCompletion(tasks, id) {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }

        return {
            ...task,
            completed: !task.completed,
            updatedAt: new Date().toISOString()
        };
    });
}

export function getTaskStats(tasks) {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    const completionRate = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
        total,
        completed,
        pending,
        completionRate
    };
}

export function filterTasks(tasks, filter, searchTerm) {
    const query = searchTerm.trim().toLowerCase();

    return tasks.filter(task => {
        const matchesFilter =
            filter === "All" ||
            (filter === "Completed" && task.completed) ||
            (filter === "Pending" && !task.completed);

        const matchesSearch =
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });
}
