"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const deleteTask = (taskId) => {
    if (!taskId) {
        console.log("Error: Task ID is required.");
        return;
    }
    const tasks = (0, helpers_1.loadTasks)();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    if (filteredTasks.length === tasks.length) {
        console.log("Error: Task not found.");
        return;
    }
    (0, helpers_1.saveTasks)(filteredTasks);
    console.log(`Task deleted successfully. Task ID: ${taskId}`);
};
exports.default = deleteTask;
