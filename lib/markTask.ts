import { Task } from "../types/task";
import { loadTasks, saveTasks } from "./helpers";

export const isTaskStatusType = (value: any): value is Task['status'] => {
    return ["in-progress", "done", "open"].includes(value);
};

const markTask = (taskId: string, status: Task['status']): void => {
    if(!taskId || !status) {
        console.log("Error: Task ID and status are required.");
        return;
    }

    const tasks = loadTasks();
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

    saveTasks(tasks);
    console.log(`Task marked as ${status}. Task ID: ${taskId}`);
}

export default markTask;