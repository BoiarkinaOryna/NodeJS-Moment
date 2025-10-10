const express = require('express')
const PostRouter = require('./Post /post.routes.cjs')

const app = express()
app.use(express.json())
app.use(PostRouter)

app.listen(8000, 'localhost', ()=>{
    console.log("server started on ")
})