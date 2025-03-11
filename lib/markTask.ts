import { Task } from "../types/task";
import { loadTasks, saveTasks } from "./helpers";

const markTask = async (taskId: Task['id'], status: Task['status'], fileName: string): Promise<void> => {
    if(!taskId || !status) {
        console.log("Error: Task ID and status are required.");
        return;
    }

    const tasks = await loadTasks(fileName);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if(taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }

    if(tasks[taskIndex].status === status) {
        console.log(`Error: Task is already marked as ${status}.`);
        return;
    }

    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    await saveTasks(tasks, fileName);
    console.log(`Task marked as ${status}. Task ID: ${taskId}`);
}

export default markTask;