const fs = require("fs");
const path = require("path");

export const TASKS_FILE = path.join(__dirname, "..", "tasks.json");

export type HelpCommandType = "add" | "update" | "delete" | "mark-in-progress" | "mark-done" | "list";

export interface Task {
    id: string;
    description: string;
    status: "open" | "in-progress" | "done";
    createdAt: Date;
    updatedAt: Date;
}

export const isHelpCommandType = (value: any): value is HelpCommandType => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
};

export function ensureTasksFileExists() {
    if(!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]), "utf8"); //  utf8 is a widely used encoding that can represent every character in the Unicode character set. 
    }
}

export const showHelp = (cmd?: HelpCommandType) => {
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

// Load tasks from file
const loadTasks = () => {
    const taskData = fs.readFileSync(TASKS_FILE, "utf8");
    return JSON.parse(taskData);
}

// Save tasks to file
const saveTasks = (tasks: Task[]) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks), "utf8");
};

// Generate a unique task ID
const generateTaskId = () => {
    return Date.now().toString();
}