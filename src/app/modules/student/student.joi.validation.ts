import Joi from 'joi'

const UserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name must be less than or equal to 20 characters',
      'string.pattern.base':
        'First name must only contain alphabetic characters',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string().max(20).allow('').optional(),
  lastName: Joi.string().max(20).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.max': 'Last name must be less than or equal to 20 characters',
    'any.required': 'Last name is required',
  }),
})

const GuardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().allow('').optional(),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father contact number must be a string',
    'string.empty': 'Father contact number is required',
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().allow('').optional(),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother contact number must be a string',
    'string.empty': 'Mother contact number is required',
    'any.required': 'Mother contact number is required',
  }),
})

const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().allow('').optional(),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number must be a string',
    'string.empty': 'Local guardian contact number is required',
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local guardian address must be a string',
    'string.empty': 'Local guardian address is required',
    'any.required': 'Local guardian address is required',
  }),
})

const StudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: UserNameValidationSchema.required().messages({
    'object.base': 'Name must be an object',
    'object.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be one of "male", "female", or "other"',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().allow('').optional(),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
    'any.required': 'Emergency contact number is required',
  }),
  bloodType: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow('')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
    'any.required': 'Permanent address is required',
  }),
  guardian: GuardianValidationSchema.required().messages({
    'object.base': 'Guardian must be an object',
    'object.empty': 'Guardian is required',
    'any.required': 'Guardian is required',
  }),
  localGuardian: LocalGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian must be an object',
    'object.empty': 'Local guardian is required',
    'any.required': 'Local guardian is required',
  }),
  profileImg: Joi.string().allow('').optional(),
  isActive: Joi.string().valid('active', 'block').default('active').optional(),
})
export default StudentValidationSchema
