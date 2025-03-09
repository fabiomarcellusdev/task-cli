"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const updateTask = (taskId, newDescription) => {
    if (!taskId || !newDescription) {
        console.log("Error: Task ID and new description are required.");
        return;
    }
    const tasks = (0, helpers_1.loadTasks)();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
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
    (0, helpers_1.saveTasks)(tasks);
    console.log(`Task updated successfully. Task ID: ${taskId}`);
};
exports.default = updateTask;
