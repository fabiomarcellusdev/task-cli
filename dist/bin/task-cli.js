#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addNewTask_1 = __importDefault(require("../lib/addNewTask"));
const deleteTask_1 = __importDefault(require("../lib/deleteTask"));
const helpers_1 = require("../lib/helpers");
const listTasks_1 = __importDefault(require("../lib/listTasks"));
const markTask_1 = __importDefault(require("../lib/markTask"));
const showHelp_1 = __importDefault(require("../lib/showHelp"));
const updateTask_1 = __importDefault(require("../lib/updateTask"));
(0, helpers_1.ensureTasksFileExists)();
const args = process.argv.slice(2);
const command = args[0];
switch (command) {
    case "add":
        (0, addNewTask_1.default)(args[1]);
        break;
    case "update":
        (0, updateTask_1.default)(args[1], args[2]);
        break;
    case "delete":
        (0, deleteTask_1.default)(args[1]);
        break;
    case "mark":
        if ((0, helpers_1.isTaskStatusType)(args[2])) {
            (0, markTask_1.default)(args[1], args[2]);
        }
        console.log("\nMissing status. Please use one of the following after the taskId: open, in-progress, done\n");
        break;
    case "list":
        if ((0, helpers_1.isTaskStatusType)(args[1]) || args[1] === "all") {
            (0, listTasks_1.default)(args[1]);
        }
        if (!args[1]) {
            (0, listTasks_1.default)();
        }
        break;
    case "help":
        if ((0, helpers_1.isHelpCommandType)(args[1])) {
            (0, showHelp_1.default)(args[1]);
        }
        else {
            (0, showHelp_1.default)();
        }
        break;
    default:
        console.log("\n");
        console.log("Invalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list");
        console.log("\n");
}
