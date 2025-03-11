import { HelpCommandType } from "./helpers";

export const HELP_MESSAGES_PER_COMMAND = {
    add: "add <task description> - Adds a new task with the given description.",
    update: "update <task ID> <description> - Updates the description of the task with the given ID.",
    delete: "delete <task ID> - Deletes the task with the given ID.",
    mark: "mark <task ID> <status> - Updates task to have new status.",
    list: "list <status or all> - Lists all tasks, optionally filtered by status.",
};

export const HELP_ALL_COMMANDS = `
            Usage: task-cli <command> [options]
            
            Commands:
              ${HELP_MESSAGES_PER_COMMAND.add}
              ${HELP_MESSAGES_PER_COMMAND.update}
              ${HELP_MESSAGES_PER_COMMAND.delete}
              ${HELP_MESSAGES_PER_COMMAND.mark}
              ${HELP_MESSAGES_PER_COMMAND.list}
            
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
export const showHelp = (cmd?: HelpCommandType): void => {
    

    if (cmd && HELP_MESSAGES_PER_COMMAND[cmd]) {
        console.log(HELP_MESSAGES_PER_COMMAND[cmd]);
    } else {
        console.log(HELP_ALL_COMMANDS);
    }
};

export default showHelp;