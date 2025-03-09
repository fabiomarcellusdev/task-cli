import { generateTaskId, loadTasks, saveTasks } from "./helpers";
import { Task } from "../types/task";

/**
 * Adds and saves a new task with the given description
 * @param description Task description
 * @returns 
 */
const addNewTask = (description: string): void => {
    if(!description) {
        console.log("Error: Task description is required.");
        return;
    }

    const tasks = loadTasks();

    const newDate = new Date();
    const newTask: Task = {
        id: generateTaskId(),
        description,
        status: "open",
        createdAt: newDate,
        updatedAt: newDate,
    }

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully. Task ID: ${newTask.id}`);
}

export default addNewTask;