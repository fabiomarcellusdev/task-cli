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
// filepath: /c:/Developer Work/Software Engineer Projects/task-cli/__tests__/task-cli.test.ts
const promises_1 = __importDefault(require("fs/promises"));
const path = require("path");
const child_process_1 = require("child_process");
const helpers_1 = require("../lib/helpers");
const showHelp_1 = require("../lib/showHelp");
const TEST_FILE_NAME = "test-tasks";
// const TEST_TASKS_FILE_PATH = path.join(__dirname, "..", `dist/${TEST_FILE_NAME}.json`);
const executeCommand = (command, typeOfTest) => {
    return (0, child_process_1.execSync)(`node dist/bin/task-cli.js ${command} --file ${TEST_FILE_NAME + "-" + typeOfTest}`).toString();
};
const createCommandExecutor = (typeOfTest) => {
    const typeOfTestCommand = typeOfTest;
    return (command) => {
        return executeCommand(command, typeOfTestCommand);
    };
};
const getTestingTasksData = (typeofTest) => __awaiter(void 0, void 0, void 0, function* () {
    let taskData;
    let PATH = path.join(__dirname, "..", `dist/${TEST_FILE_NAME + "-" + typeofTest}.json`);
    try {
        yield promises_1.default.readFile(PATH, "utf8");
    }
    catch (err) {
        yield promises_1.default.writeFile(PATH, JSON.stringify([]), "utf8");
    }
    taskData = yield promises_1.default.readFile(PATH, "utf8");
    return JSON.parse(taskData);
});
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // reset task data to empty array
    // await fs.writeFile(TEST_TASKS_FILE_PATH, JSON.stringify([]), "utf8");
    // Ensure the tasks file is deleted before each test
    // const testTypes = ["add", "update", "delete", "mark-done", "listAll", "listByStatus", "help", "invalid-command"];
    // for (const typeOfTest of testTypes) {
    //     const filePath = path.join(__dirname, "..", `dist/${TEST_FILE_NAME + "-" + typeOfTest}.json`);
    //     try {
    //         await fs.unlink(filePath);
    //         console.log(`Deleted tasks file at ${filePath}`);
    //     } catch (err:any) {
    //         if (err.code !== 'ENOENT') {
    //             throw err;
    //         }
    //         console.log(`Tasks file not found at ${filePath}, nothing to delete`);
    //     }
    // }
}));
test('should add a new task', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "add";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    const taskDescription = "Test Task";
    executeTestCommand(`add "${taskDescription}"`);
    const tasks = yield getTestingTasksData(typeOfTest);
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toEqual(taskDescription);
}));
test('should update a task\'s description', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "update";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    const oldTaskDescription = "Old Test Description";
    executeTestCommand(`add "${oldTaskDescription}"`);
    const tasks = yield getTestingTasksData(typeOfTest);
    expect(tasks[0].description).toBe(oldTaskDescription);
    console.log("TASKS BEFORE UPDATE: ", tasks);
    const newTaskDescription = "New Test Description";
    executeTestCommand(`update ${tasks[0].id} "${newTaskDescription}"`);
    const updatedTasks = yield getTestingTasksData(typeOfTest);
    console.log("TASKS AFTER UPDATE: ", updatedTasks);
    expect(updatedTasks[0].description).toBe(newTaskDescription);
}));
test('should delete a task', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "delete";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    executeTestCommand('add "Test task to delete"');
    const tasks = yield getTestingTasksData(typeOfTest);
    expect(tasks.length).toBe(1);
    const taskId = tasks[0].id;
    executeTestCommand(`delete ${taskId}`);
    const updatedTasks = yield getTestingTasksData(typeOfTest);
    expect(updatedTasks.length).toBe(0);
}));
test('should mark a task as done', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "mark-done";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    executeTestCommand('add "Test task to mark done"');
    const tasks = yield getTestingTasksData(typeOfTest);
    expect(tasks[0].status).toBe("open");
    const taskId = tasks[0].id;
    executeTestCommand(`mark ${taskId} done`);
    const updatedTasks = yield getTestingTasksData(typeOfTest);
    expect(updatedTasks[0].status).toBe("done");
}));
test('should list all tasks', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "listAll";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    executeTestCommand('add "Test task 1"');
    executeTestCommand('add "Test task 2"');
    const tasks = yield getTestingTasksData(typeOfTest);
    expect(tasks.length).toBe(2);
    const output = executeTestCommand('list');
    expect(output).toContain("Test task 1");
    expect(output).toContain("Test task 2");
}));
test('should list tasks by status', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeOfTest = "listByStatus";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    executeTestCommand('add "Test Task Done"');
    executeTestCommand('add "Test Task In-Progress"');
    executeTestCommand('add "Test Task Open"');
    const tasks = yield getTestingTasksData(typeOfTest);
    executeTestCommand(`mark ${tasks[0].id} done`);
    executeTestCommand(`mark ${tasks[1].id} in-progress`);
    const doneListOutput = executeTestCommand('list done');
    expect(doneListOutput).toContain("Test Task Done");
    expect(doneListOutput).not.toContain("Test Task In-Progress");
    expect(doneListOutput).not.toContain("Test Task Open");
    const inProgressListOutput = executeTestCommand('list in-progress');
    expect(inProgressListOutput).toContain("Test Task In-Progress");
    expect(inProgressListOutput).not.toContain("Test Task Done");
    expect(inProgressListOutput).not.toContain("Test Task Open");
    const openListOutput = executeTestCommand('list open');
    expect(openListOutput).toContain("Test Task Open");
    expect(openListOutput).not.toContain("Test Task Done");
    expect(openListOutput).not.toContain("Test Task In-Progress");
}));
test('should display help information', () => {
    const typeOfTest = "help";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    const allCommandsListOutput = executeTestCommand('help');
    expect(allCommandsListOutput).toEqual(showHelp_1.HELP_ALL_COMMANDS);
    for (const cmd in showHelp_1.HELP_MESSAGES_PER_COMMAND) {
        if ((0, helpers_1.isHelpCommandType)(cmd)) {
            const commandOutput = executeTestCommand(`help ${cmd}`);
            expect(commandOutput).toEqual(showHelp_1.HELP_MESSAGES_PER_COMMAND[cmd]);
        }
    }
});
test('should display invalid command message', () => {
    const typeOfTest = "invalid-command";
    const executeTestCommand = createCommandExecutor(typeOfTest);
    const output = executeTestCommand('invalid-command');
    expect(output).toContain("Invalid command. Please use one of the following commands:");
});
