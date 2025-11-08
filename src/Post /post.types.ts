import { Request, Response } from "express"

export type Post = {
    id: number,
    title: string,
    description: string,
    image: string,
    likes: number
}

export type PostWithTags = Post & {tags: string[]}

export type CreatePostData = Omit<Post, "id">
export type UpdatePostData = Partial<Omit<Post, "id">>

// Request<P, ResBody, ReqBody, ReqQuery, Locals>
// P - динамічний параметри (req.params)
// ResBody - відповідь контроллера, те, що робимо у res.json
// ReqBody - тіло запиту (при POST/PATCH) в req.body
// ReqQuery - query параметри запиту, те, що в req.body
// Locals поки не чіпаємо

// Response<ResBody, Locals>
// ResBody - відповідь контроллера, те, що робимо у res.json
// Locals поки не чіпаємо

// getAll: (req: Request<object, Product[] | string, object, { take?: string }>,res: Response<Product[] | string>) => void,

export interface ControllerContract {
    getAll: (req: Request<object, Post[] | string, object, {take?: string, skip?: string}>, res: Response<Post[] | string>) => void,
    create: (req: Request<object, Post | string, CreatePostData, object>, res: Response<Post | string>) => Promise<void>,
    getById: (req: Request<{id: string}, Post | string, object, object>, res: Response<Post | string>) => void,
    update: (req: Request<{id: string}, Post | string, UpdatePostData, object>, res: Response<Post | string>) => void,
    delete: (req: Request<{id: string}, Post | string, Post, object>, res: Response<Post | string>) => void
}

export interface ServiceContract {
    getAll: (take?: number, skip?: number) => Post[],
    create: (createdPosts: Post[], newPost: Post) => Promise<true | undefined>,
    getById: (id: number) => Post | undefined,
    update: (id: number, dataToUpdate: UpdatePostData) => Promise<string | Post | null>,
    delete: (id: number) => Promise<Post | string>
}