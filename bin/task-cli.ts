#!/usr/bin/env node

import addNewTask from "../lib/addNewTask";
import deleteTask from "../lib/deleteTask";
import { isHelpCommandType, ensureTasksFileExists, isTaskStatusType } from "../lib/helpers";
import listTasks from "../lib/listTasks";
import markTask from "../lib/markTask";
import showHelp from "../lib/showHelp";
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
    case "mark":
        if(isTaskStatusType(args[2])) {
            markTask(args[1], args[2]);
        }
        console.log("\nMissing status. Please use one of the following after the taskId: open, in-progress, done\n");
        break;
    case "list":
        if(isTaskStatusType(args[1]) || args[1] === "all") {
            listTasks(args[1]);
        }
        if(!args[1]) {
            listTasks();
        }
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
        console.log("\n");
        console.log("Invalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list");
        console.log("\n");
}