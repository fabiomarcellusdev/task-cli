import { generateTaskId, loadTasks, saveTasks } from "./helpers";
import { Task } from "../types/task";

/**
 * Adds and saves a new task with the given description
 * @param description Task description
 * @returns 
 */
const addNewTask = async (description: Task['description'], fileName: string): Promise<void> => {
    if(!description) {
        console.log("Error: Task description is required.");
        return;
    }

    const tasks = await loadTasks(fileName);

    const newDate = new Date().toISOString();
    const newTask: Task = {
        id: generateTaskId(),
        description,
        status: "open",
        createdAt: newDate,
        updatedAt: newDate,
    }

    tasks.push(newTask);
    await saveTasks(tasks, fileName);
    console.log(`Task "${newTask.description}" added successfully. Task ID: ${newTask.id}`);
}

export default addNewTask;