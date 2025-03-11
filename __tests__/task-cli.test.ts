import fs from "fs/promises";
const path = require("path");
import { execSync } from 'child_process';
import { isHelpCommandType } from '../lib/helpers';
import { HELP_ALL_COMMANDS, HELP_MESSAGES_PER_COMMAND } from '../lib/showHelp';
import { Task } from '../types/task';


const TEST_FILE_NAME = "test-tasks";

const executeCommand = (command: string, typeOfTest: string): string => {
    return execSync(`node dist/bin/task-cli.js ${command} --file ${TEST_FILE_NAME + "-" + typeOfTest}`).toString();
}

const createCommandExecutor = (typeOfTest: string): (command: string) => string => {
    const typeOfTestCommand = typeOfTest;
    return (command: string) => {
        return executeCommand(command, typeOfTestCommand);
    }
}

const getTestingTasksData = async (typeofTest: string): Promise<Task[]> => {
    let taskData; 
    let PATH = path.join(__dirname, "..", `dist/${TEST_FILE_NAME + "-" + typeofTest}.json`);

    try {
        await fs.readFile(PATH, "utf8");
    } catch (err) {
        await fs.writeFile(PATH, JSON.stringify([]), "utf8"); 
    }
    taskData = await fs.readFile(PATH, "utf8");
    
    return JSON.parse(taskData);
}

afterEach(async () => {
    // Ensure the tasks file is deleted after each test
    const testTypes = ["add", "update", "delete", "mark-done", "listAll", "listByStatus", "help", "invalid-command"];
    for (const typeOfTest of testTypes) {
        const filePath = path.join(__dirname, "..", `dist/${TEST_FILE_NAME + "-" + typeOfTest}.json`);
        try {
            await fs.unlink(filePath);
        } catch (err:any) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
    }
});

test('should add a new task', async () => {
    const typeOfTest = "add";
    const executeTestCommand = createCommandExecutor(typeOfTest);
   
    const taskDescription = "Test Task";
    executeTestCommand(`add "${taskDescription}"`);
    const tasks: Task[] = await getTestingTasksData(typeOfTest);

    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toEqual(taskDescription);
});

test('should update a task\'s description', async () => {
    const typeOfTest = "update";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    const oldTaskDescription = "Old Test Description";
    executeTestCommand(`add "${oldTaskDescription}"`);

    const tasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(tasks[0].description).toBe(oldTaskDescription);

    const newTaskDescription = "New Test Description";
    executeTestCommand(`update ${tasks[0].id} "${newTaskDescription}"`);
    const updatedTasks: Task[] = await getTestingTasksData(typeOfTest);
   
    expect(updatedTasks[0].description).toBe(newTaskDescription);
});

test('should delete a task', async () => {
    const typeOfTest = "delete";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    executeTestCommand('add "Test task to delete"');
    const tasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(tasks.length).toBe(1);
    const taskId = tasks[0].id;

    executeTestCommand(`delete ${taskId}`);
    const updatedTasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(updatedTasks.length).toBe(0);
});

test('should mark a task as done', async () => {
    const typeOfTest = "mark-done";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    executeTestCommand('add "Test task to mark done"');
    const tasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(tasks[0].status).toBe("open");
    const taskId = tasks[0].id;

    executeTestCommand(`mark ${taskId} done`);
    const updatedTasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(updatedTasks[0].status).toBe("done");
});

test('should list all tasks', async () => {
    const typeOfTest = "listAll";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    executeTestCommand('add "Test task 1"');
    executeTestCommand('add "Test task 2"');
    const tasks: Task[] = await getTestingTasksData(typeOfTest);
    expect(tasks.length).toBe(2);

    const output = executeTestCommand('list');
    expect(output).toContain("Test task 1");
    expect(output).toContain("Test task 2");
});

test('should list tasks by status', async () => {
    const typeOfTest = "listByStatus";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    executeTestCommand('add "Test Task Done"');
    executeTestCommand('add "Test Task In-Progress"');
    executeTestCommand('add "Test Task Open"');

    const tasks: Task[] = await getTestingTasksData(typeOfTest);

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
});

test('should display help information', () => {
    const typeOfTest = "help";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    const allCommandsListOutput = executeTestCommand('help');
    expect(allCommandsListOutput).toContain(HELP_ALL_COMMANDS);

    for (const cmd in HELP_MESSAGES_PER_COMMAND) {
        if(isHelpCommandType(cmd)) {
            const commandOutput = executeTestCommand(`help ${cmd}`);
            expect(commandOutput).toContain(HELP_MESSAGES_PER_COMMAND[cmd]);
        }
    }
});

test('should display invalid command message', () => {
    const typeOfTest = "invalid-command";
    const executeTestCommand = createCommandExecutor(typeOfTest);

    const output = executeTestCommand('invalid-command');
    expect(output).toContain("Invalid command. Please use one of the following commands:");
});
