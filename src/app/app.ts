import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './modules/student/student.route'
import { UserRoutes } from './modules/user/user.route'
import { error } from 'console'
import globalErrorHandler from '../middlwares/globalErrorHandler'
import notFound from '../middlwares/notFound'
import router from './routes'
const app: Application = express()

app.use(express.json())

app.use(cors())

//application routes
app.use('/api/v1', router)

const test = (req: Request, res: Response) => {}
app.get('/', test)

app.use(globalErrorHandler)

app.use(notFound)

export default app
