import { PostService } from "./post.service"
import { Post, UpdatePostData, ControllerContract } from "./post.types"
const createdPosts: Post[] = []


export const PostController: ControllerContract = {
    getAll: (req, res) =>{
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
        if (take && skip){
            res.json(PostService.getAll(+take, +skip))
            return
        }
        if (take){
            res.json(PostService.getAll(+take))
            return
        }
        if (skip){
            res.json(PostService.getAll(+skip))
            return
        } else{
            if (take && skip){
                res.json(PostService.getAll())
            }
        }
    },
    create: async (req, res) =>{
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
    getById: (req, res) =>{
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
    update: async (req, res) =>{
        const body = req.body
        const id = req.params.id

        if (!body){
            res.status(422).json("body is required")
            return
        } 
        if(!id){
            res.status(422).json("id is required")
            return
        }
        const result = await PostService.update(+id, body)
        if (!result){
            res.status(404).json("post is not found")
            return
        }
        if (typeof(result) == 'string'){
            res.status(500).json(result)
            return
        }
        res.json("post is updated")
    },
    delete: async (req, res) =>{
        const id = req.params.id
        const result = await PostService.delete(+id)
        if (typeof(result) == 'string'){
            res.status(404).json("post is not found")
            return
        }
        res.json(result)
    }
}