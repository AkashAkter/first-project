import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    const result = await StudentServices.createStudentIntoDB(studentData)

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are Retrived Successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentsFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is Retrive Successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
}
