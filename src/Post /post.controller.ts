import { Request, Response } from "express"
import { PostService } from "./post.service"
import { Post, CreatePostData, UpdatePostData } from "./post.types"
const createdPosts: Post[] = []


export const PostController = {
    getAll: (req: Request, res: Response) =>{
        const take = req.query.take
        const skip = req.query.skip
    
        if (take){
            if (isNaN(+take)){
                res.status(400).json("take must be a number")
                return
            }
        } else if(skip){
            if(isNaN(+skip)){
                res.status(400).json("skip must be a number")
                return
            }
        }
        res.json(PostService.getAll(take, skip))
    },
    create: async (req: Request, res: Response) =>{
        const body: CreatePostData | undefined = req.body
        console.log("body =", body)
    
        if (!body){
            res.status(422).json("body does not exist")
            return
        } 
        const newPost: Post = {... body, id: createdPosts.length + 1}
        if (!newPost.title){
            res.status(422).json("title is required")
            return
        }
        if (!newPost.description){
            res.status(422).json("description is required")
            return
        }
        if (!newPost.image){
            res.status(422).json("image is required")
            return
        }
        const isCreated = await PostService.create(createdPosts, newPost)
        if (isCreated){
            res.status(201).json("new post is created")
        } else{
            res.status(500).json("post creation failed")
        }
    }, 
    getById: (req: Request, res: Response) =>{
        const id = req.params.id
        if (id){
            const post = PostService.getById(+id)
            console.log("post =", post)
            if (post){
                res.json(post)
                return
            }
            res.status(404).json("Post is not found")
        }else{
            res.status(422).json("id is required")
        }
    },
    update: async (req: Request, res: Response) =>{
        const body: UpdatePostData | undefined = req.body
        const id = req.params.id

        if (!body){
            res.status(422).json("body is required")
            return
        } 
        if(!id){
            res.status(422).json("id is required")
            return
        }
        const result: Post | null | string = await PostService.update(+id, body)
        if (!result){
            res.status(404).json("post is not found")
            return
        }
        if (typeof(result) == 'string'){
            res.status(500).json(result)
            return
        }
        res.json("post is updated")
    }
}