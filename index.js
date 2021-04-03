const server = require("./server.js")

const port = process.argv[2]

server.listen(port, () => {
    console.log(`Code School 2021 Todo App Running on Port ${port}`)
})
