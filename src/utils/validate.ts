import * as Yup from 'yup';

const phoneRegExp: RegExp = /^[\+]{0,1}380([0-9]{9})$/;

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .required("This field is Required")
      .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email('Invalid email').required('Required'),
    photo: Yup.mixed().required('Required'),
  });