import type { Task } from "../types/task";
import fs from "fs/promises";
import path from "path";
import { customAlphabet } from "nanoid";

export const getTaskFilePath = (fileName: string): string => {
    if(!fileName.endsWith(".json")) {
        fileName += ".json";
    }
    const FILE_PATH = path.join(__dirname, "..", `${fileName}`);
    
    return FILE_PATH;
}


export type HelpCommandType = "add" | "update" | "delete" | "mark" | "list";

export const isHelpCommandType = (value: any): value is HelpCommandType => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
};

export const isTaskStatusType = (value: any): value is Task['status'] => {
    return ["in-progress", "done", "open"].includes(value);
};

/**
 * Ensures that the specified tasks file exists. If not, it's created and initialized with an empty array.
 */
export const ensureTasksFileExists = async (fileName: string): Promise<void> => {
    const FILE_PATH = getTaskFilePath(fileName);
    try {
        await fs.access(FILE_PATH);
    } catch (err: any) {
        await fs.writeFile(FILE_PATH, JSON.stringify([]), "utf8"); 
    }
}
/**
 * Load tasks data from specified file.
 * @returns Array of task objects
 */
export const loadTasks = async (fileName: string): Promise<Task[]> => {
    const FILE_PATH = getTaskFilePath(fileName);
    const taskData = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(taskData);
}

/**
 * Saves tasks data to specified file.
 * @param tasks Array of task objects
 */
export const saveTasks = async (tasks: Task[], fileName: string): Promise<void> => {
    const FILE_PATH = getTaskFilePath(fileName);
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks), "utf8");
};

const nanoid = customAlphabet('1234567890abcdef', 5);
/**
 * 
 * @returns Unique task ID based on current Date
 */
export const generateTaskId = () => {
    return nanoid();
}