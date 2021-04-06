const express = require("express")
const server = express()

server.use(express.json({}))

server.use(express.static(`${__dirname}/public/`))

server.get("/todo/:id", (req, res) => {
    console.log(req.body)
    res.send(`get request recieved for todo with id ${req.params.id}`)
})

server.get("/todo", (req, res) => {
    console.log(req.body)
    res.send(`get request recieved to list todos`)
})

server.post("/todo", (req, res) => {
    console.log(req.body)
    res.send(`post request recieved to create todo`)
})

server.put("/todo/:id", (req, res) => {
    console.log(req.body)
    res.send(`put request recieved to replace todo with id ${req.params.id}`)
})

server.patch("/todo/:id", (req, res) => {
    console.log(req.body)
    res.send(`patch request recieved to update todo with id ${req.params.id}`)
})

module.exports = server