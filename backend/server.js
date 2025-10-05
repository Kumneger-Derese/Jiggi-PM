import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {
  errorConvertor,
  errorHandler,
  notFound
} from './middleware/errorMiddleware.js'
import connectDB from './config/connectDb.js'
import { userRouter } from './routes/userRoute.js'
import { projectRouter } from './routes/projectRoute.js'
import { listRouter } from './routes/listRoute.js'
import {cardRouter} from "./routes/cardRoute.js";

await connectDB()

const app = express()
const port = process.env.PORT

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api/lists', listRouter)
app.use('/api/cards', cardRouter)

// error handlers
app.use(notFound)
app.use(errorConvertor)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
