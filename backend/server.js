import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {errorConvertor, errorHandler, notFound} from './middleware/errorMiddleware.js'
import connectDB from './config/connectDb.js'
import {userRouter} from './routes/userRoute.js'
import {projectRouter} from './routes/projectRoute.js'
import {listRouter} from './routes/listRoute.js'
import {cardRouter} from "./routes/cardRoute.js";
import {inviteRouter} from "./routes/inviteRoute.js";
import http from "node:http";
import {initSocketServer} from "./socket.js";

await connectDB()

const app = express()
const port = process.env.PORT
const clientUrl = process.env.FRONTEND_URL

const httpServer = http.createServer(app)
initSocketServer(httpServer)

//middleware
app.use(express.json())
app.use(cors({origin: clientUrl}));
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api/lists', listRouter)
app.use('/api/cards', cardRouter)
app.use('/api/invitations', inviteRouter)

// error handlers
app.use(notFound)
app.use(errorConvertor)
app.use(errorHandler)

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
