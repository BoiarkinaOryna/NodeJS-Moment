const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')
const allPostsPath = path.join(__dirname, "posts.json")
console.log(allPostsPath)
const allPosts = JSON.parse(fs.readFileSync(allPostsPath, "utf-8"))

const PostService = {
    getAll: (take, skip)=>{
        if(take && skip){
            return neededPosts.slice(skip, +skip + +take)
        }else if(take){
            return neededPosts.slice(0, take)
        }else if(skip){
            return neededPosts.slice(skip)
        }else{
            return allPosts
        }
    },
    create: async (createdPosts, newPost)=>{
        try{
            createdPosts.push(newPost)
            await fsPromises.writeFile("./createdPosts.json", JSON.stringify(createdPosts, null, 4))
            return true
        } catch (error){
            return
        }
    },
    getById: (id)=>{
        console.log("id =", id)
        const posts = [...allPosts]
        return posts.find(post => post.id == id)
    }
}

module.exports = PostService