import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'

const allPostsPath = path.join(__dirname, "posts.json")
console.log(allPostsPath)
const allPosts:{
    id: number,
    title: string,
    description: string,
    image: string,
    likes: number
}[] =  JSON.parse(fs.readFileSync(allPostsPath, "utf-8"))

export const PostService = {
    getAll: (take: string, skip: string)=>{
        if(take && skip){
            return allPosts.slice(+skip, +skip + +take)
        }else if(take){
            return allPosts.slice(0, +take)
        }else if(skip){
            return allPosts.slice(+skip)
        }else{
            return allPosts
        }
    },
    create: async (createdPosts: object[], newPost: object)=>{
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
    }
}