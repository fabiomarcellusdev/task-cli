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
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
/**
 * Lists all tasks or tasks with a specific status
 * @param filter Task status to filter by
*/
const listTasks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = "all", fileName) {
    const tasks = yield (0, helpers_1.loadTasks)(fileName);
    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }
    let filteredTasks;
    switch (filter) {
        case "done":
            filteredTasks = tasks.filter(task => task.status === "done");
            break;
        case "open":
            filteredTasks = tasks.filter(task => task.status === "open");
            break;
        case "in-progress":
            filteredTasks = tasks.filter(task => task.status === "in-progress");
            break;
        default:
            filteredTasks = tasks;
    }
    if (filteredTasks.length === 0) {
        console.log(`No ${filter} tasks found.`);
        return;
    }
    console.log("\nTasks:");
    filteredTasks.forEach(task => {
        console.log(`[${task.status.toUpperCase()}] ${task.id} - ${task.description}`);
    });
    console.log("");
});
exports.default = listTasks;
