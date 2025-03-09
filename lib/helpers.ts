import type { Task } from "../types/task";
const fs = require("fs");
const path = require("path");

export const TASKS_FILE = path.join(__dirname, "..", "tasks.json");

export type HelpCommandType = "add" | "update" | "delete" | "mark-in-progress" | "mark-done" | "list";

export const isHelpCommandType = (value: any): value is HelpCommandType => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
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
 * Displays help information for all or specified command.
 * @param cmd Help {cmd}
 */
export const showHelp = (cmd?: HelpCommandType): void => {
    const helpMessages = {
        add: "add <task description> - Adds a new task with the given description.",
        update: "update <task ID> <status> - Updates the status of the task with the given ID.",
        delete: "delete <task ID> - Deletes the task with the given ID.",
        "mark-in-progress": "mark-in-progress <task ID> - Marks the task with the given ID as in-progress.",
        "mark-done": "mark-done <task ID> - Marks the task with the given ID as done.",
        list: "list [filter] - Lists all tasks, optionally filtered by status.",
    };

    if (cmd && helpMessages[cmd]) {
        console.log(helpMessages[cmd]);
    } else {
        console.log(`
            Usage: task-cli <command> [options]
            
            Commands:
              ${helpMessages.add}
              ${helpMessages.update}
              ${helpMessages.delete}
              ${helpMessages["mark-in-progress"]}
              ${helpMessages["mark-done"]}
              ${helpMessages.list}
            
            Examples:
              task-cli add "Buy groceries" --priority high
              task-cli update 12345 done
              task-cli delete 12345
              task-cli mark-in-progress 12345
              task-cli mark-done 12345
              task-cli list in-progress
              task-cli help add
                    `);
    }
};

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