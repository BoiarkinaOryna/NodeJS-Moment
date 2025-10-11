import { Router } from "express"
import { PostController } from "./post.controller"

const PostRouter = Router()

PostRouter.get("/posts", PostController.getAll)

PostRouter.post("/posts", PostController.create)

PostRouter.get("/posts/:id", PostController.getById)

export { PostRouter }