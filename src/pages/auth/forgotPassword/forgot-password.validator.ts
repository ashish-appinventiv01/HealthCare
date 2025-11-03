import * as Yup from 'yup';

import { emailRegex, mobileRegex } from '../../../constants/validation';

export const ForgotPasswordSchema = Yup.object().shape({
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
});

export type ForgotPasswordData = Yup.InferType<typeof ForgotPasswordSchema>;


