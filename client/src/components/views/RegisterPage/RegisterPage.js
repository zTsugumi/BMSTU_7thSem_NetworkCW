import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Typography } from 'antd';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import moment from 'moment';
import AllActions from '../../../redux/actions/allActions';
import './RegisterPage.css';

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 16 },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();

  const signupUser = (creds) => dispatch(AllActions.UserActions.signupUser(creds));
  const userState = useSelector(state => state.user);

  const signupValidationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required('First Name is required'),
    lastname: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  return (
    <Formik
      // Initial values
      initialValues={{
        email: '',
        firtname: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      }}

      // Validation Schema using yup
      validationSchema={signupValidationSchema}

      // onSubmit Handler
      onSubmit={(values, actions) => {
        setTimeout(() => {
          const creds = {
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          signupUser(creds)
            .then(
              () => {
                if (!userState.errMess) {
                  alert(userState.errMess);
                }
                else {
                  props.history.push('/signin');
                }
              }
            )

          actions.setSubmitting(false);
          actions.resetForm();
        }, 500);
      }}
    >
      {(props) => (
        <div className='app'>
          <Form {...formItemLayout} className='form'>
            <Title className='form__item' level={2}>Sign up</Title>
            <FormItem
              className='form__item'
              name='firstname'
              label='First Name'
              required={true}
            >
              <Input name='firstname' placeholder='Enter your First Name' />
            </FormItem>
            <FormItem
              className='form__item'
              name='lastname'
              label='Last Name'
              required={true}
            >
              <Input name='lastname' placeholder='Enter your Last Name' />
            </FormItem>
            <FormItem
              className='form__item'
              name='email'
              label='Email'
              require={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input name='email' placeholder='Enter your Email' />
            </FormItem>
            <FormItem
              className='form__item'
              name='password'
              label='Password'
              required={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input.Password name='password' placeholder='Enter your password' />
            </FormItem>
            <FormItem
              className='form__item'
              name='confirmPassword'
              label='Confirm'
              required={true}
              hasFeedback={true}
              showValidateSuccess={true}
            >
              <Input.Password name='confirmPassword' placeholder='Confirm your password' />
            </FormItem>
            <SubmitButton className='register-form-button'>Submit</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};


export default RegisterPage;
