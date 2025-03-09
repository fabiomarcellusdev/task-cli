import { loadTasks, saveTasks } from "./helpers";

const updateTask = (taskId: string, newDescription: string) => {
    if (!taskId || !newDescription) {
        console.log("Error: Task ID and new description are required.");
        return;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);

    console.log(`Task updated successfully. Task ID: ${taskId}`);
}

export default updateTask;