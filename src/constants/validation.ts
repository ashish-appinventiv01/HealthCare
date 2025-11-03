export const passwordError = `Password must be 8–16 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character (@, #, $, %).`;
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%])[A-Za-z\d@#$%]{8,16}$/;
export const loginPasswordError = `Enter Correct Password`;

export const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const mobileRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4,5})(?: *x(\d+))?\s*$/;

export const emailError = 'Please enter a valid email address';
export const contactNumberError = 'Enter a valid mobile number';

export const nameRegex = /^[A-Za-z ]+$/;
export const nameRegexNotAlphaNumeric = /^[A-Za-z ]+$/;
export const urlRegex =
  /^((ftp|http|https):\/\/)?(www\.)?(?!.*(ftp|http|https|www\.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#.-]+)*(\/[\w#?%=&.-]+)?$/gm;
