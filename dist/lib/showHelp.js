"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showHelp = void 0;
/**
 * Displays help information for all or specified command.
 * @param cmd Help {cmd}
 */
const showHelp = (cmd) => {
    const helpMessages = {
        add: "add <task description> - Adds a new task with the given description.",
        update: "update <task ID> <status> - Updates the status of the task with the given ID.",
        delete: "delete <task ID> - Deletes the task with the given ID.",
        "mark-in-progress": "mark-in-progress <task ID> - Marks the task with the given ID as in-progress.",
        "mark-done": "mark-done <task ID> - Marks the task with the given ID as done.",
        list: "list [filter] - Lists all tasks, optionally filtered by status.",
    };
    if (cmd && helpMessages[cmd]) {
        console.log(helpMessages[cmd]);
    }
    else {
        console.log(`
            Usage: task-cli <command> [options]
            
            Commands:
              ${helpMessages.add}
              ${helpMessages.update}
              ${helpMessages.delete}
              ${helpMessages["mark-in-progress"]}
              ${helpMessages["mark-done"]}
              ${helpMessages.list}
            
            Examples:
              task-cli add "Buy groceries" --priority high
              task-cli update 12345 done
              task-cli delete 12345
              task-cli mark-in-progress 12345
              task-cli mark-done 12345
              task-cli list in-progress
              task-cli help add
                    `);
    }
};
exports.showHelp = showHelp;
exports.default = exports.showHelp;
