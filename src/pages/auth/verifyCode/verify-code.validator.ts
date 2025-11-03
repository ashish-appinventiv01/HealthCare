import * as Yup from 'yup';

export const VerifyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .matches(/^\d{6}$/, 'Enter the 6-digit code'),
});

export type VerifyCodeData = Yup.InferType<typeof VerifyCodeSchema>;


