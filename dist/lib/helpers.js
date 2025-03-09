"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTaskId = exports.saveTasks = exports.loadTasks = exports.isTaskStatusType = exports.isHelpCommandType = exports.TASKS_FILE = void 0;
exports.ensureTasksFileExists = ensureTasksFileExists;
const fs = require("fs");
const path = require("path");
const nanoid_1 = require("nanoid");
exports.TASKS_FILE = path.join(__dirname, "..", "tasks.json");
const isHelpCommandType = (value) => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
};
exports.isHelpCommandType = isHelpCommandType;
const isTaskStatusType = (value) => {
    return ["in-progress", "done", "open"].includes(value);
};
exports.isTaskStatusType = isTaskStatusType;
/**
 * Ensures that the tasks file exists. If it doesn't, it's creates and contains an empty array.
 */
function ensureTasksFileExists() {
    if (!fs.existsSync(exports.TASKS_FILE)) {
        fs.writeFileSync(exports.TASKS_FILE, JSON.stringify([]), "utf8");
    }
}
/**
 * Load tasks data from TASKS_FILE file
 * @returns Array of task objects
 */
const loadTasks = () => {
    const taskData = fs.readFileSync(exports.TASKS_FILE, "utf8");
    return JSON.parse(taskData);
};
exports.loadTasks = loadTasks;
/**
 * Saves tasks data to TASKS_FILE file
 * @param tasks Array of task objects
 */
const saveTasks = (tasks) => {
    fs.writeFileSync(exports.TASKS_FILE, JSON.stringify(tasks), "utf8");
};
exports.saveTasks = saveTasks;
const nanoid = (0, nanoid_1.customAlphabet)('1234567890abcdef', 5);
/**
 *
 * @returns Unique task ID based on current Date
 */
const generateTaskId = () => {
    return nanoid();
};
exports.generateTaskId = generateTaskId;
