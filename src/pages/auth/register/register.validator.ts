import * as Yup from 'yup';

import { emailRegex, mobileRegex, passRegex, passwordError } from '../../../constants/validation';

export const RegisterSchema = Yup.object().shape({
  identifier: Yup.string()
    .trim()
    .required('This field is required')
    .test(
      'email-or-mobile',
      'Enter a valid email or mobile number',
      (value) => {
        const val = (value || '').trim();
        if (!val) return true; // required() will handle empty case
        return emailRegex.test(val) || mobileRegex.test(val);
      }
    ),
  password: Yup.string()
    .required('This field is required')
    .matches(passRegex, passwordError),
  dob: Yup.string().optional(),
});

export type RegisterData = Yup.InferType<typeof RegisterSchema>;


