#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(__dirname, "tasks.json");

// Ensure tasks file exists
if(!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify([]), "utf8"); //  utf8 is a widely used encoding that can represent every character in the Unicode character set. 
}

// Load tasks from file
const loadTasks = () => {
    const taskData = fs.readFileSync(TASKS_FILE, "utf8");
    return JSON.parse(taskData);
}

const saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks), "utf8");
};

// Generate a unique task ID
const generateTaskId = () => {
    return Date.now().toString();
}

// Extract arguments passed into CLI script
// If passing in cmd `task-cli add "Buy groceries"` then process.argv returns [
//   "node program file path here",
//   "path to the script being executed here",
//   "add",
//   "Buy groceries"
// ]
const args = process.argv.slice(2); // Slice at index 2 so array returned will only contain the arguments passed to the script
const command = args[0]; //Ex: For command `task-cli add "Buy groceries"` command will be `add`

switch(command) {
    case "add":
        let taskDescription = args[1];
        addTask(taskDescription);
        break;
    case "update":
        let taskId = args[1];
        let taskStatus = args[2];
        updateTask(taskId, taskStatus);
        break;
    case "delete":
        let taskIdToDelete = args[1];
        deleteTask(taskIdToDelete);
        break;
    case "mark-in-progress":
        let taskIdToMarkInProgress = args[1];
        markInProgress(taskIdToMarkInProgress, "in-progress");
        break;
    case "mark-done":
        let taskIdToMarkDone = args[1];
        markDone(taskIdToMarkDone, "done");
        break;
    case "list":
        listTasks(args[1] ?? "");
        break;
    case "help":
        console.log("Available commands: add, update, delete, mark-in-progress, mark-done, list");
        break;
    default:
        console.log("Invalid command. Please use one of the following commands: add, update, delete, mark-in-progress, mark-done, list");
}