import { loadTasks, saveTasks } from "./helpers";

const updateTask = (id: string, newDescription: string) => {
    if (!id || !newDescription) {
        console.log("Error: Task ID and new description are required.");
        return;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    
    console.log(`Task updated successfully. Task ID: ${id}`);
}