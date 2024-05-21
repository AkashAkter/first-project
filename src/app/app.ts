import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './modules/student/student.route'
const app: Application = express()

app.use(express.json())

app.use(cors())

//application routes
app.use('/api/v1/students', StudentRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 50
  res.send(a)
}
app.get('/', getAController)

console.log(process.cwd())

export default app
