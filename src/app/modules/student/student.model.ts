import { Schema, model, connect } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface'

import bcrypt from 'bcrypt'
import config from '../../config'

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'this field is required'],
    maxlength: [20, 'no more than 20 character'],
    trim: true,
    message: '{VALUE} is not valid',
  },
  middleName: {
    type: String,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'this field is required'],
    maxlength: 20,
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'this field is required'],
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'this field is required'],
  },
  motherName: {
    type: String,
    required: [true, 'this field is required'],
  },
  motherOccupation: {
    type: String,
  },
  motherContactNo: {
    type: String,
    required: [true, 'this field is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'this field is required'],
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
    required: [true, 'this field is required'],
  },
  address: {
    type: String,
    required: [true, 'this field is required'],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: UserNameSchema,
      required: [true, 'this field is required'],
    },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'this field is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'this field is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'this field is required'],
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'this field is required'],
    },
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'this field is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'this field is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'this field is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'this field is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'block'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `
})

//pre save middleware
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook')
  //hashing password
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//post save middleware
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})
//creating a custom static
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
