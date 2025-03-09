import type { Task } from "../types/task";
const fs = require("fs");
const path = require("path");

export const TASKS_FILE = path.join(__dirname, "..", "tasks.json");

export type HelpCommandType = "add" | "update" | "delete" | "mark-in-progress" | "mark-done" | "list";

export const isHelpCommandType = (value: any): value is HelpCommandType => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
};

export const isTaskStatusType = (value: any): value is Task['status'] => {
    return ["in-progress", "done", "open"].includes(value);
};

/**
 * Ensures that the tasks file exists. If it doesn't, it's creates and contains an empty array.
 */
export function ensureTasksFileExists(): void {
    if(!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]), "utf8"); 
    }
}

/**
 * Load tasks data from TASKS_FILE file
 * @returns Array of task objects
 */
export const loadTasks = (): Task[] => {
    const taskData = fs.readFileSync(TASKS_FILE, "utf8");
    return JSON.parse(taskData);
}

/**
 * Saves tasks data to TASKS_FILE file
 * @param tasks Array of task objects
 */
export const saveTasks = (tasks: Task[]) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks), "utf8");
};

/**
 * 
 * @returns Unique task ID based on current Date
 */
export const generateTaskId = () => {
    return Date.now().toString();
}