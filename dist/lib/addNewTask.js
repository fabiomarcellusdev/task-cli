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
 * Adds and saves a new task with the given description
 * @param description Task description
 * @returns
 */
const addNewTask = (description, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!description) {
        console.log("Error: Task description is required.");
        return;
    }
    const tasks = yield (0, helpers_1.loadTasks)(fileName);
    const newDate = new Date().toISOString();
    const newTask = {
        id: (0, helpers_1.generateTaskId)(),
        description,
        status: "open",
        createdAt: newDate,
        updatedAt: newDate,
    };
    tasks.push(newTask);
    yield (0, helpers_1.saveTasks)(tasks, fileName);
    console.log(`Task "${newTask.description}" added successfully. Task ID: ${newTask.id}`);
});
exports.default = addNewTask;
