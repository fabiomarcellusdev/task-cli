# Task CLI

Task CLI is a command-line tool for managing tasks. You can add, update, delete, mark, and list tasks using this tool. This project is designed to be simple, efficient, and easy to use, making task management straightforward from the command line.

## Introduction

Task CLI is a lightweight and efficient command-line tool for managing tasks. It allows users to add, update, delete, mark, and list tasks with ease. The tool is built using TypeScript and leverages modern JavaScript libraries to ensure reliability and performance.

## Technical Overview

### System Architecture

The Task CLI tool is structured as follows:
- **bin**: Contains the entry point for the CLI tool.
- **lib**: Contains the core logic for task management (add, update, delete, mark, list).
- **types**: Contains TypeScript type definitions.
- **__tests__**: Contains unit tests for the CLI tool.

### Tech Stack

- **TypeScript**: For type-safe JavaScript.
- **Jest**: For testing.
- **Nanoid**: For generating unique task IDs.
- **Minimist**: For parsing command-line arguments.
- **Babel**: For transpiling modern JavaScript.

### Key Decisions

- **TypeScript**: Chosen for its type safety and developer experience.
- **Jest**: Selected for its comprehensive testing capabilities.
- **Nanoid**: Used for generating unique and secure task IDs.

## Features & Use Cases

### Major Functionalities

- **Add Task**: Adds a new task with a given description.
- **Update Task**: Updates the description of an existing task.
- **Delete Task**: Deletes a task by its ID.
- **Mark Task**: Marks a task with a new status (open, in-progress, done).
- **List Tasks**: Lists all tasks or tasks filtered by status.
- **Help**: Displays help information for all or specified commands.


## Commands

### Running the CLI Commands

```sh
npm start <command> [options]
```

Alternatively, you can use the <code>npx</code> command to run the CLI without specifying the path.

```sh
npx task-cli <command> [options]
```

### Command Usage

<strong>add</strong>: Adds a new task with the given description. Initial task status is set to "open".
```sh
npx task-cli add <description>
```

<strong>update</strong>: Updates the description of the task identified via id.
```sh
npx task-cli update <id> <new description>
```

<strong>delete</strong>: Deletes a task.
```sh
npx task-cli delete <id>
```

<strong>mark</strong>: Mark a task with status "in-progress", "done", or "open".
```sh
npx task-cli mark <id> <new status>
```

<strong>list</strong>: List all tasks.
```sh
npx task-cli list
```

<strong>list</strong>: List tasks filtered by status.
```sh
npx task-cli list <status>
```

<strong>help</strong>: Display all available commands with info of usage.
```sh
npx task-cli help
```

<strong>help</strong>: Display usage info of specified command.
```sh
npx task-cli help <command>
```

## Setup Instructions

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/fabiomarcellusdev/task-cli.git
    cd task-cli
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

### Building the Project

To build the project, run:

```sh
npm run build
```

## Code Structure Overview

* <strong>bin</strong>: Contains the entry point for the CLI tool (<code>task-cli.ts</code>)
* <strong>lib</strong>: Contains the core logic for task management:
    * <code>addNewTask.ts</code>
    * <code>deleteTask.ts</code>
    * <code>listTasks.ts</code>
    * <code>markTask.ts</code>
    * <code>updateTask.ts</code>
    * <code>helpers.ts</code>
    * <code>showHelp.ts</code>
* <strong>types</strong>: Contains TypeScript type definitions (<code>task.d.ts</code>)
* <strong>tests</strong>: Contains unit tests for the CLI tool (<code>task-cli.test.ts</code>)


## Testing Strategy

The project uses Jest for testing. To run the tests, use the following command:
```sh
npm test
```

The tests ensure that all CLI commands work as expected and handle edge cases gracefully.

## Design Decisions & Trade-offs

* <strong>TypeScript</strong>: Chosen for its type safety and developer experience, but it adds a compilation step.
* <strong>Jest</strong>: Provides comprehensive testing capabilities but requires additional configuration.
* <strong>Nanoid</strong>: Ensures unique and secure tasks but adds an external dependency.

## System Design Documentation

### Scaling Strategies

The CLI tool is designed to handle a moderate number of tasks efficiently. For larger datasets, consider optimizing file I/O operations or using a database. Implementing use of database is a possible future feature.

### Security Considerations

* <strong>Input Validation</strong>: Ensures that all user inputs are validated to prevent injection attacks.
* <strong>File Access</strong>: Uses secure methods to read and write task data.

## License

This project is licensed under the MIT License. See the LICENSE file for details.