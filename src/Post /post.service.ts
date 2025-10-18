import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { Post, UpdatePostData, ServiceContract } from './post.types'

const allPostsPath = path.join(__dirname, "posts.json")
const allPosts: Post[] =  JSON.parse(fs.readFileSync(allPostsPath, "utf-8"))

export const PostService: ServiceContract = {
    getAll: (take, skip)=>{
        console.log(typeof(take), typeof(skip))
        if(take && skip){
            return allPosts.slice(skip, skip + take)
        }else if(take){
            return allPosts.slice(0, take)
        }else if(skip){
            return allPosts.slice(skip)
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
    getById: (id: number)=>{
        console.log("id =", id)
        const posts = [...allPosts]
        return posts.find(post => post.id == id)
    },
    async update(id, dataToUpdate){
        const post = this.getById(id)
        if (!post){
            return null
        }
        try{
            const updatedPost = {...post, ...dataToUpdate}
            allPosts.splice(id - 1, 1, updatedPost)
            await fsPromises.writeFile(allPostsPath, JSON.stringify(allPosts, null, 4))
            return updatedPost
        } catch (error) {
            console.log(error)
            return String(error)
        }
    }
}