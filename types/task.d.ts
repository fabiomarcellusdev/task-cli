export interface Task {
    id: string;
    description: string;
    status: "open" | "in-progress" | "done";
    createdAt: Date;
    updatedAt: Date;
}