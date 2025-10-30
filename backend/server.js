import 'dotenv/config'
import cors from 'cors'
import http from 'node:http'
import express from 'express'
import { initSocketServer } from './socket.js'
import connectDB from './config/connectDb.js'
import { listRouter } from './routes/listRoute.js'
import { userRouter } from './routes/userRoute.js'
import { cardRouter } from './routes/cardRoute.js'
import { inviteRouter } from './routes/inviteRoute.js'
import { projectRouter } from './routes/projectRoute.js'
import { dashboardRouter } from './routes/dashboardRoute.js'
import {
  errorConvertor,
  errorHandler,
  notFound
} from './middleware/errorMiddleware.js'

await connectDB()

const app = express()
const port = process.env.PORT
const clientUrl = process.env.FRONTEND_URL

const httpServer = http.createServer(app)
initSocketServer(httpServer)

//middleware
app.use(express.json())
// app.use(cors({origin: '*', credentials : true}));
app.use(cors({ origin: clientUrl }))
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/users', userRouter)
app.use('/api/lists', listRouter)
app.use('/api/cards', cardRouter)
app.use('/api/projects', projectRouter)
app.use('/api/invitations', inviteRouter)
app.use('/api/dashboard', dashboardRouter)

// error handlers
app.use(notFound)
app.use(errorConvertor)
app.use(errorHandler)

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
