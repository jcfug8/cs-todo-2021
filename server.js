const express = require("express")
const server = express()

server.use(express.json({}))

server.use(express.static(`${__dirname}/public/`))

server.get("/", (req, res) => {
    console.log(req.body)
    res.send("get request proccessed")
})

server.post("/", (req, res) => {
    console.log(req.body)
    res.send("post request proccessed")
})

module.exports = server