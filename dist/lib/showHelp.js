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
        update: "update <task ID> <description> - Updates the description of the task with the given ID.",
        delete: "delete <task ID> - Deletes the task with the given ID.",
        mark: "mark <task ID> <status> - Updates task to have new status.",
        list: "list <status or all> - Lists all tasks, optionally filtered by status.",
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
              ${helpMessages.mark}
              ${helpMessages.list}
            
            Examples:
              task-cli add "Buy groceries"
              task-cli update 12345 "Buy milk"
              task-cli delete 12345
              task-cli mark 12345 in-progress
              task-cli list in-progress
              task-cli help add
                    `);
    }
};
exports.showHelp = showHelp;
exports.default = exports.showHelp;
