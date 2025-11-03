import * as Yup from 'yup';

import { passRegex, passwordError } from '../../../constants/validation';

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required')
    .matches(passRegex, passwordError),
  confirm: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('password')], 'Passwords must match and meet requirements.'),
});

export type ResetPasswordData = Yup.InferType<typeof ResetPasswordSchema>;


