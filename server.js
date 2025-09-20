import express from 'express'
import { getDate } from './main.js'

const app = express()

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.listen(8000, 'localhost', ()=>{
    console.log("server started")
})