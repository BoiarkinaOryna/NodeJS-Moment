// import express from 'express'
// import path from 'path'
// import fs from 'fs'
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

function getDate(){
    return `${moment().month(1).format("YYYY-MM-DD").replace(/-/g, "/")} ${moment().format("HH:mm:ss")}`
}

const allPostsPath = path.join(__dirname, "posts.json")
const allPosts = JSON.parse(fs.readFileSync(allPostsPath, "utf-8"))

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.get("/posts", (req, res) =>{
    res.json(allPosts)
})

app.listen(8000, 'localhost', ()=>{
    console.log("server started")
})