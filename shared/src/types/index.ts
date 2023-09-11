export type User = {
    id: string,
    username: string,
    createdAt: Date,
    updatedAt?: Date,
}

export type Message = {
    id: string,
    userId: string,
    content: string,
    createdAt: Date,
    updatedAt?: Date,
}