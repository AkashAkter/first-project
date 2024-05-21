import { z } from 'zod'

// Define Zod schemas
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(1).max(20).trim(),
})

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string(),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string(),
  motherContactNo: z.string().min(1),
})

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

const StudentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().min(1).email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'block']),
  isDeleted: z.boolean(),
})

export default StudentValidationSchema
