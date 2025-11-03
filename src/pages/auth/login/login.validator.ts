import * as Yup from 'yup';

import { emailRegex, mobileRegex, passRegex, loginPasswordError } from '../../../constants/validation';

export const LoginSchema = Yup.object().shape({
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
    .matches(passRegex, loginPasswordError),
});

export type LoginData = Yup.InferType<typeof LoginSchema>;


