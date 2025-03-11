import { Task } from "../types/task";
import { loadTasks, saveTasks } from "./helpers";

const deleteTask = async (taskId: Task['id'], fileName: string): Promise<void> => {
    if(!taskId) {
        console.log("Error: Task ID is required.");
        return;
    }

    const tasks = await loadTasks(fileName);
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    if(filteredTasks.length === tasks.length) {
        console.log("Error: Task not found.");
        return;
    }

    await saveTasks(filteredTasks, fileName);
    console.log(`Task deleted successfully. Task ID: ${taskId}`);
}

export default deleteTask;