import { Task } from "../types/task";
import { loadTasks, saveTasks } from "./helpers";

const updateTask = async (taskId: Task['id'], newDescription: Task['description'], fileName: string): Promise<void> => {
    if (!taskId || !newDescription) {
        console.log("Error: Task ID and new description are required.");
        return;
    }

    const tasks = await loadTasks(fileName);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }

    if(tasks[taskIndex].description === newDescription) {
        console.log("Error: New description is the same as the current description.");
        return;
    }
    
    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    await saveTasks(tasks, fileName);

    console.log(`Task updated successfully. Task ID: ${taskId}`);
}

export default updateTask;