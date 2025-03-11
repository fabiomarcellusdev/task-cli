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
const updateTask = (taskId, newDescription, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId || !newDescription) {
        console.log("Error: Task ID and new description are required.");
        return;
    }
    const tasks = yield (0, helpers_1.loadTasks)(fileName);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    console.log("Task ID: ", taskId);
    console.log("New Description: ", newDescription);
    console.log("fileName: ", fileName);
    console.log("Found tasks: ", tasks);
    if (taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }
    if (tasks[taskIndex].description === newDescription) {
        console.log("Error: New description is the same as the current description.");
        return;
    }
    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    yield (0, helpers_1.saveTasks)(tasks, fileName);
    console.log(`Task updated successfully. Task ID: ${taskId}`);
});
exports.default = updateTask;
