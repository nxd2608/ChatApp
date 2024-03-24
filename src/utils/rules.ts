import * as yup from 'yup'

export const credentialSchema = yup.object({
  email: yup
    .string()
    .required('Email không được bỏ trống')
    .matches(/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 100 ký tự')
    .max(100, 'Độ dài từ 5 - 100 ký tự'),

  password: yup
    .string()
    .required('Password không được bỏ trống')
    .min(6, 'Độ dài từ 6 - 100 ký tự')
    .max(100, 'Độ dài từ 6 - 100 ký tự'),

  firstName: yup.string().trim().required('firstName không được bỏ trống'),

  lastName: yup.string().trim().required('lastName không được bỏ trống')
})

export type CredentialSchema = yup.InferType<typeof credentialSchema>
