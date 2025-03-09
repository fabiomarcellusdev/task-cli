export interface Task {
    id: string;
    description: string;
    status: "open" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
}