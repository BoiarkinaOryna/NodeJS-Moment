const express = require('express')
const PostController = require('./post.controller.cjs')

const PostRouter = express.Router()

PostRouter.get("/posts", PostController.getAll)

PostRouter.post("/posts", PostController.create)

PostRouter.get("/posts/:id", PostController.getById)

module.exports = PostRouter