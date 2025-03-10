"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
/**
 * Adds and saves a new task with the given description
 * @param description Task description
 * @returns
 */
const addNewTask = (description) => {
    if (!description) {
        console.log("Error: Task description is required.");
        return;
    }
    const tasks = (0, helpers_1.loadTasks)();
    const newDate = new Date().toISOString();
    const newTask = {
        id: (0, helpers_1.generateTaskId)(),
        description,
        status: "open",
        createdAt: newDate,
        updatedAt: newDate,
    };
    tasks.push(newTask);
    (0, helpers_1.saveTasks)(tasks);
    console.log(`Task "${newTask.description}" added successfully. Task ID: ${newTask.id}`);
};
exports.default = addNewTask;
