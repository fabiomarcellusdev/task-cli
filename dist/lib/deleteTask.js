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
const deleteTask = (taskId, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId) {
        console.log("Error: Task ID is required.");
        return;
    }
    const tasks = yield (0, helpers_1.loadTasks)(fileName);
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    if (filteredTasks.length === tasks.length) {
        console.log("Error: Task not found.");
        return;
    }
    yield (0, helpers_1.saveTasks)(filteredTasks, fileName);
    console.log(`Task deleted successfully. Task ID: ${taskId}`);
});
exports.default = deleteTask;
