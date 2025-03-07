#!/usr/bin/env node

import { isHelpCommandType, showHelp, ensureTasksFileExists } from "../lib/helpers";

// Ensure tasks file exists
ensureTasksFileExists()

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
        addTask(args[1]);
        break;
    case "update":
        updateTask(args[1], args[2]);
        break;
    case "delete":
        deleteTask(args[1]);
        break;
    case "mark-in-progress":
        markInProgress(args[1], "in-progress");
        break;
    case "mark-done":
        markDone(args[1], "done");
        break;
    case "list":
        listTasks(args[1] ?? "");
        break;
    case "help":
        if(isHelpCommandType(args[1])) {
            showHelp(args[1]);
        }
        else {
            showHelp();
        }
        break;
    default:
        console.log("Invalid command. Please use one of the following commands: add, update, delete, mark-in-progress, mark-done, list");
}