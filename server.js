const express = require("express")
const server = express()

const bodyparser = require("body-parser")

server.use(bodyparser.json({}))

server.get("/", (req, res) => {
    console.log(req.body)
    res.send("get request proccessed")
})

server.post("/", (req, res) => {
    console.log(req.body)
    res.send("post request proccessed")
})

module.exports = server