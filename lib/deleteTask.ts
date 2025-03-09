import { Task } from "../types/task";
import { loadTasks, saveTasks } from "./helpers";

const deleteTask = (taskId: Task['id']) => {
    if(!taskId) {
        console.log("Error: Task ID is required.");
        return;
    }

    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    if(filteredTasks.length === tasks.length) {
        console.log("Error: Task not found.");
        return;
    }

    saveTasks(filteredTasks);
    console.log(`Task deleted successfully. Task ID: ${taskId}`);
}

export default deleteTask;