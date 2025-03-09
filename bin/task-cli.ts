#!/usr/bin/env node

import addNewTask from "../lib/addNewTask";
import { isHelpCommandType, showHelp, ensureTasksFileExists } from "../lib/helpers";
import updateTask from "../lib/updateTask";

ensureTasksFileExists();

const args = process.argv.slice(2); 
const command = args[0];

switch(command) {
    case "add":
        addNewTask(args[1]);
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
        console.log("Invalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list");
}