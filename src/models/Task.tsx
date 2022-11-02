class Task {
    id: number;
    email: string
    title: string
    description: string
    is_completed: boolean
    created_at: string
    updated_at: string
    constructor(id: number, email: string, title: string, description: string, isCompleted: boolean, createdAt: string, updatedAt: string) {
        this.id = id
        this.email = email
        this.title = title
        this.description = description
        this.is_completed = isCompleted
        this.created_at = createdAt
        this.updated_at = updatedAt
    }
}
export default Task