#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const addNewTask_1 = __importDefault(require("../lib/addNewTask"));
const deleteTask_1 = __importDefault(require("../lib/deleteTask"));
const helpers_1 = require("../lib/helpers");
const listTasks_1 = __importDefault(require("../lib/listTasks"));
const markTask_1 = __importDefault(require("../lib/markTask"));
const showHelp_1 = __importDefault(require("../lib/showHelp"));
const updateTask_1 = __importDefault(require("../lib/updateTask"));
const args = (0, minimist_1.default)(process.argv.slice(2));
const command = args._[0];
const fileName = args.file || "tasks"; // Default to "tasks" if no file path is provided
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.ensureTasksFileExists)(fileName);
    switch (command) {
        case "add":
            yield (0, addNewTask_1.default)(args._[1], fileName);
            break;
        case "update":
            yield (0, updateTask_1.default)(args._[1], args._[2], fileName);
            break;
        case "delete":
            yield (0, deleteTask_1.default)(args._[1], fileName);
            break;
        case "mark":
            if ((0, helpers_1.isTaskStatusType)(args._[2])) {
                yield (0, markTask_1.default)(args._[1], args._[2], fileName);
            }
            console.log("\nMissing status. Please use one of the following after the taskId: open, in-progress, done\n");
            break;
        case "list":
            if ((0, helpers_1.isTaskStatusType)(args._[1]) || args._[1] === "all") {
                yield (0, listTasks_1.default)(args._[1], fileName);
            }
            else {
                yield (0, listTasks_1.default)(undefined, fileName);
            }
            break;
        case "help":
            if ((0, helpers_1.isHelpCommandType)(args._[1])) {
                (0, showHelp_1.default)(args._[1]);
            }
            else {
                (0, showHelp_1.default)();
            }
            break;
        default:
            console.log("\nInvalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list\n");
    }
}))();
// ensureTasksFileExists(fileName);
// switch(command) {
//     case "add":
//         addNewTask(args._[1], fileName);
//         break;
//     case "update":
//         updateTask(args._[1], args._[2], fileName);
//         break;
//     case "delete":
//         deleteTask(args._[1], fileName);
//         break;
//     case "mark":
//         if(isTaskStatusType(args._[2])) {
//             markTask(args._[1], args._[2], fileName);
//         }
//         console.log("\nMissing status. Please use one of the following after the taskId: open, in-progress, done\n");
//         break;
//     case "list":
//         if(isTaskStatusType(args._[1]) || args._[1] === "all") {
//             listTasks(args._[1], fileName);
//         }
//         else {
//             listTasks("all", fileName);
//         }
//         break;
//     case "help":
//         if(isHelpCommandType(args._[1])) {
//             showHelp(args._[1]);
//         }
//         else {
//             showHelp();
//         }
//         break;
//     default:
//         console.log("\nInvalid command. Please use one of the following commands: help, add, update, delete, mark-in-progress, mark-done, list\n");
// }
