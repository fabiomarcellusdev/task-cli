#!/usr/bin/env node

import minimist from "minimist";
import addNewTask from "../lib/addNewTask";
import deleteTask from "../lib/deleteTask";
import { isHelpCommandType, ensureTasksFileExists, isTaskStatusType } from "../lib/helpers";
import listTasks from "../lib/listTasks";
import markTask from "../lib/markTask";
import showHelp from "../lib/showHelp";
import updateTask from "../lib/updateTask";

const args = minimist(process.argv.slice(2)); 
const command = args._[0];
const fileName = args.file || "tasks"; // Default to "tasks" if no file path is provided

(async () => {
    await ensureTasksFileExists(fileName);

    switch(command) {
        case "add":
            await addNewTask(args._[1], fileName);
            break;
        case "update":
            await updateTask(args._[1], args._[2], fileName);
            break;
        case "delete":
            await deleteTask(args._[1], fileName);
            break;
        case "mark":
            if(isTaskStatusType(args._[2])) {
                await markTask(args._[1], args._[2], fileName);
            }
            console.log("\nMissing status. Please use one of the following after the taskId: open, in-progress, done\n");
            break;
        case "list":
            if(isTaskStatusType(args._[1]) || args._[1] === "all") {
                await listTasks(args._[1], fileName);
            }
            else {
                await listTasks(undefined, fileName);
            }
            break;
        case "help":
            if(isHelpCommandType(args._[1])) {
                showHelp(args._[1]);
            }
            else {
                showHelp();
            }
            break;
        default:
            console.log("\nInvalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list\n");
    }
})();