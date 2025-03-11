import { Task } from "../types/task";
import { loadTasks } from "./helpers";

/** 
 * Lists all tasks or tasks with a specific status
 * @param filter Task status to filter by
*/
const listTasks = async (filter: Task['status'] | "all" = "all", fileName: string): Promise<void> => {
    const tasks = await loadTasks(fileName);

    if(tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    let filteredTasks;
    switch(filter) {
        case "done":
            filteredTasks = tasks.filter(task => task.status === "done");
            break;
        case "open":
            filteredTasks = tasks.filter(task => task.status === "open");
            break;
        case "in-progress":
            filteredTasks = tasks.filter(task => task.status === "in-progress");
            break;
        default:
            filteredTasks = tasks;
    }

    if(filteredTasks.length === 0) {
        console.log(`No tasks found using ${filter} filter.`);
        return;
    }

    console.log("\nTasks:");
    filteredTasks.forEach(task => { 
        console.log(`[${task.status.toUpperCase()}] ${task.id} - ${task.description}`);
    });
    console.log("\n");
}

export default listTasks;