import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import sendResponse from '../../utilis/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //creating a schema validation using Zod

    const { password, student: studentData } = req.body

    //data validation using Zod
    // const zodParsedData = StudentValidationSchema.parse(studentData)

    const result = await UserService.createStudentIntoDB(password, studentData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
