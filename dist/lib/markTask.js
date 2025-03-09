"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const markTask = (taskId, status) => {
    if (!taskId || !status) {
        console.log("Error: Task ID and status are required.");
        return;
    }
    const tasks = (0, helpers_1.loadTasks)();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        console.log("Error: Task not found.");
        return;
    }
    if (tasks[taskIndex].status === status) {
        console.log(`Error: Task is already marked as ${status}.`);
        return;
    }
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    (0, helpers_1.saveTasks)(tasks);
    console.log(`Task marked as ${status}. Task ID: ${taskId}`);
};
exports.default = markTask;
