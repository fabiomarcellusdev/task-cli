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
exports.generateTaskId = exports.saveTasks = exports.loadTasks = exports.ensureTasksFileExists = exports.isTaskStatusType = exports.isHelpCommandType = exports.getTaskFilePath = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const getTaskFilePath = (fileName) => {
    if (!fileName.endsWith(".json")) {
        fileName += ".json";
    }
    const FILE_PATH = path_1.default.join(__dirname, "..", `${fileName}`);
    // console.log("CALLED FILE PATH: ", FILE_PATH);
    return FILE_PATH;
};
exports.getTaskFilePath = getTaskFilePath;
const isHelpCommandType = (value) => {
    return ["add", "update", "delete", "mark-in-progress", "mark-done", "list"].includes(value);
};
exports.isHelpCommandType = isHelpCommandType;
const isTaskStatusType = (value) => {
    return ["in-progress", "done", "open"].includes(value);
};
exports.isTaskStatusType = isTaskStatusType;
/**
 * Ensures that the specified tasks file exists. If not, it's created and initialized with an empty array.
 */
const ensureTasksFileExists = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const FILE_PATH = (0, exports.getTaskFilePath)(fileName);
    try {
        yield promises_1.default.access(FILE_PATH);
        // await fs.readFile(FILE_PATH, "utf8");
    }
    catch (err) {
        console.log("Cannot find tasks file. Creating a new one...");
        yield promises_1.default.writeFile(FILE_PATH, JSON.stringify([]), "utf8");
    }
});
exports.ensureTasksFileExists = ensureTasksFileExists;
/**
 * Load tasks data from specified file.
 * @returns Array of task objects
 */
const loadTasks = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Loading tasks from file: ", fileName);
    const FILE_PATH = (0, exports.getTaskFilePath)(fileName);
    const taskData = yield promises_1.default.readFile(FILE_PATH, "utf8");
    return JSON.parse(taskData);
});
exports.loadTasks = loadTasks;
/**
 * Saves tasks data to specified file.
 * @param tasks Array of task objects
 */
const saveTasks = (tasks, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const FILE_PATH = (0, exports.getTaskFilePath)(fileName);
    yield promises_1.default.writeFile(FILE_PATH, JSON.stringify(tasks), "utf8");
});
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
