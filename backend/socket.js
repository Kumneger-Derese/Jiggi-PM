import {Server} from "socket.io";

let io

const socketHandlers = (socket) => {
    console.log(`👋 Socket ${socket.id} connected.`)

    //handle for a user to join a list room
    socket.on('joinListRoom', (projectId) => {
        socket.join(projectId)
        console.log(`Socket ${socket.id} joined room ${projectId}.`)
    })

    //handle for a user to join a card room
    socket.on('joinCardRoom', (listId) => {
        socket.join(listId)
        console.log(`Socket ${socket.id} joined room ${listId}.`)
    })

    socket.on('disconnect', () => {
        console.log(`🔥 Socket ${socket.id} disconnected`)
    })
}

const initSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
        }
    })

    // main connection handler
    io.on('connection', socketHandlers)

    return io
}

export {initSocketServer, io}