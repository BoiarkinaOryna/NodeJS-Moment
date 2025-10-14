export type Post = {
    id: number,
    title: string,
    description: string,
    image: string,
    likes: number
}

export type CreatePostData = Omit<Post, "id">
export type UpdatePostData = Partial<Omit<Post, "id">>