import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import moment from 'moment';
import AllActions from '../../../redux/actions/allActions';
import './RegisterPage.css';

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 0,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();

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
      validationSchema={Yup.object().shape({
        firstname: Yup.string()
          .required('First Name is required'),
        lastName: Yup.string()
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
      })}

      // onSubmit handler
      onSubmit={(values, actions) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          console.log(dataToSubmit);

          dispatch(AllActions.UserActions.registerUser(dataToSubmit))
            .then(
              res => {
                if (res.payload.success) {
                  props.history.push('/login');
                } else {
                  alert(res.payload.err.errmsg)
                }
              })
            .catch(err => {
              // WIP
            })

          actions.setSubmitting(false);
        }, 500);
      }}
    >
      {props => (
        <div className='app'>
          <Title level={2}>Sign up</Title>
          <Form {...formItemLayout} className='form' onSubmit={props.handleSubmit}>
            <Form.Item className='form__item' required label='First Name'>
              <Input id='firstName'
                placeholder='Enter your First Name'
                type='text'
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={
                  props.errors.name && props.touched.name ? 'text-input error' : 'text-input'
                }
              />
              {props.errors.name && props.touched.name && (
                <div className='input-feedback'>{props.errors.firstname}</div>
              )}
            </Form.Item>

            <Form.Item className='form__item' required label='Last Name'>
              <Input id='lastName'
                placeholder='Enter your Last Name'
                type='text'
                value={props.values.lastName}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={
                  props.errors.lastName && props.touched.lastName ? 'text-input error' : 'text-input'
                }
              />
              {props.errors.lastName && props.touched.lastName && (
                <div className='input-feedback'>{props.errors.lastName}</div>
              )}
            </Form.Item>

            <Form.Item className='form__item' required label='Email' hasFeedback
              validateStatus={props.errors.email && props.touched.email ? 'error' : 'success'}
            >
              <Input id='email'
                placeholder='Enter your Email'
                type='email'
                value={props.values.email}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={
                  props.errors.email && props.touched.email ? 'text-input error' : 'text-input'
                }
              />
              {props.errors.email && props.touched.email && (
                <div className='input-feedback'>{props.errors.email}</div>
              )}
            </Form.Item>

            <Form.Item className='form__item' required label='Password' hasFeedback
              validateStatus={props.errors.password && props.touched.password ? 'error' : 'success'}
            >
              <Input id='password'
                placeholder='Enter your password'
                type='password'
                value={props.values.password}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={
                  props.errors.password && props.touched.password ? 'text-input error' : 'text-input'
                }
              />
              {props.errors.password && props.touched.password && (
                <div className='input-feedback'>{props.errors.password}</div>
              )}
            </Form.Item>

            <Form.Item className='form__item' required label='Confirm' hasFeedback>
              <Input id='confirmPassword'
                placeholder='Comfirm your password'
                type='password'
                value={props.values.confirmPassword}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={
                  props.errors.confirmPassword && props.touched.confirmPassword ? 'text-input error' : 'text-input'
                }
              />
              {props.errors.confirmPassword && props.touched.confirmPassword && (
                <div className='input-feedback'>{props.errors.confirmPassword}</div>
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout} className='form__item'>
              <Button type='submit'
                className='register-form-button'
                disabled={props.isSubmitting}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};


export default RegisterPage;
