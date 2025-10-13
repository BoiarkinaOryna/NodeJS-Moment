import express from 'express'
import { PostRouter } from './Post /post.routes'

const app = express()
app.use(express.json())
app.use(PostRouter)

app.listen(8000, 'localhost', ()=>{
    console.log("server started on ")
})