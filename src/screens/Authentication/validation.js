import * as yup from 'yup';

export const registerScheme = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    name: yup.string().min(4).required(),
    phone: yup.string().min(10).max(14).required(),
  })
  .required();

export const forgotPasswordScheme = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export const loginScheme = yup
  .object({
    password: yup.string().min(6).required(),
    email: yup.string().email().required(),
    rememberMe: yup.boolean().required(),
  })
  .required();

export const changePasswordScheme = yup
  .object({
    password: yup.string().min(8).required(),
    password1: yup.string().min(8).required(),
  })
  .required();

export const otpScheme = yup
  .object({
    code: yup.string().length(6).required(),
    email: yup.string().email().required(),
  })
  .required();
