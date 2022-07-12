import * as yup from 'yup';

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const userFormSchema = yup.object({
  name: yup
    .string()
    .max(32, 'The name must not be greater than 32 characters')
    .required('Please enter your name'),
  username: yup
    .string()
    .max(32, 'The username must not be greater than 32 characters')
    .required('Please enter your username'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .max(32, 'The email must not be greater than 32 characters')
    .required('Please enter your email'),
  city: yup
    .string()
    .max(32, 'The city must not be greater than 32 characters')
    .required('Please enter your city'),
  phone: yup
    .string()
    .max(20, 'The phone must not be greater than 20 characters')
    .matches(phoneRegex, 'Please enter a valid phone number')
    .required('Please enter your phone'),
});
