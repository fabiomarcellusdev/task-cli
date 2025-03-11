"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showHelp = exports.HELP_ALL_COMMANDS = exports.HELP_MESSAGES_PER_COMMAND = void 0;
exports.HELP_MESSAGES_PER_COMMAND = {
    add: "add <task description> - Adds a new task with the given description.",
    update: "update <task ID> <description> - Updates the description of the task with the given ID.",
    delete: "delete <task ID> - Deletes the task with the given ID.",
    mark: "mark <task ID> <status> - Updates task to have new status.",
    list: "list <status or all> - Lists all tasks, optionally filtered by status.",
};
exports.HELP_ALL_COMMANDS = `
            Usage: task-cli <command> [options]
            
            Commands:
              ${exports.HELP_MESSAGES_PER_COMMAND.add}
              ${exports.HELP_MESSAGES_PER_COMMAND.update}
              ${exports.HELP_MESSAGES_PER_COMMAND.delete}
              ${exports.HELP_MESSAGES_PER_COMMAND.mark}
              ${exports.HELP_MESSAGES_PER_COMMAND.list}
            
            Examples:
              task-cli add "Buy groceries"
              task-cli update 12345 "Buy milk"
              task-cli delete 12345
              task-cli mark 12345 in-progress
              task-cli list in-progress
              task-cli help add`;
/**
 * Displays help information for all or specified command.
 * @param cmd Help {cmd}
 */
const showHelp = (cmd) => {
    if (cmd && exports.HELP_MESSAGES_PER_COMMAND[cmd]) {
        console.log(exports.HELP_MESSAGES_PER_COMMAND[cmd]);
    }
    else {
        console.log(exports.HELP_ALL_COMMANDS);
    }
};
exports.showHelp = showHelp;
exports.default = exports.showHelp;
