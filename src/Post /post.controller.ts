import { Request, Response } from "express"
import { PostService } from "./post.service"
const createdPosts: object[] = []


export const PostController = {
    getAll: (req: Request, res: Response) =>{
        const take = req.query.take
        const skip = req.query.skip
    
        console.log("take =", take, "skip =", skip)
        
        if (isNaN(take) && take != undefined){
            res.status(400).json("take must be a number")
            return
        } else if(isNaN(skip) && skip != undefined){
            res.status(400).json("skip must be a number")
            return
        }
        res.json(PostService.getAll())
    },
    create: async (req: Request, res: Response) =>{
        const body = req.body
        console.log("body =", body)
    
        if (!body){
            res.status(422).json("body does not exist")
            return
        } 
        const newPost = {... body, id: createdPosts.length + 1}
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
        const post = PostService.getById(req.params.id)
        console.log("post =", post)
        if (post){
            res.json(post)
            return
        }
        res.status(404).json("Post is not found")
    }
}