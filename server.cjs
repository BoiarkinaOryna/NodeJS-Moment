const express = require('express')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const app = express()
app.use(express.json())

function getDate(){
    return `${moment().month(1).format("YYYY-MM-DD").replace(/-/g, "/")} ${moment().format("HH:mm:ss")}`
}

const allPostsPath = path.join(__dirname, "posts.json")
const allPosts = JSON.parse(fs.readFileSync(allPostsPath, "utf-8"))

const createdPosts = []

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.get("/posts", (req, res) =>{
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
    if(take && skip){
        res.json(neededPosts.slice(skip, +skip + +take))
        return
    }else if(take){
        res.json(neededPosts.slice(0, take))
        return
    }else if(skip){
        res.json(neededPosts.slice(skip))
        return
    }
    res.json(allPosts)
})

app.post("/posts", async (req, res) =>{
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
    try{
        createdPosts.push(newPost)
        await fsPromises.writeFile("./createdPosts.js", JSON.stringify(createdPosts, null, 4))
        res.status(201).json("new post is created")
    } catch (error){
        res.status(500).json("post creation failed")
    }
})

app.get("/posts/:id", (req, res) =>{
    const posts = [...allPosts]
    posts.forEach((post) =>{
        if (post.id == req.params.id){
            res.json(post)
            return
        }
    })
    res.status(404).json("Post is not found")
})


app.listen(8000, 'localhost', ()=>{
    console.log("server started on ")
})