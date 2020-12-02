import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AllActions from '../../../redux/actions/allActions';
import './LoginPage.css';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  // rememberMe holds the user email
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;
  const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  // Formik is a wrapper for a normal form
  return (
    <Formik
      // Initial values
      initialValues={{
        email: initialEmail,
        password: '',
      }}

      // Validation Schema using yup
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}

      // onSubmit handler
      onSubmit={(values, actions) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(AllActions.UserActions.loginUser(dataToSubmit))
            .then(
              res => {
                // WIP
                if (res.payload.loginSuccess) {
                  if (rememberMe === true) {
                    window.localStorage.setItem('rememberMe', values.id);
                  } else {
                    localStorage.removeItem('rememberMe');
                  }
                  props.history.push('/');
                } else {
                  setFormErrorMessage('Check out your Account or Password again')
                }
              })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage('')
              }, 3000);
            });

          actions.setSubmitting(false);
        }, 500);
      }}
    >
      {props => (
        <div className='app'>
          <Title level={2}>Log In</Title>
          <Form className='form' onSubmit={props.handleSubmit} >
            <Form.Item className='form__item' required>
              <Input id='email'
                prefix={<UserOutlined className='form__icon_color' />}
                placeholder='Enter your email'
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

            <Form.Item className='form__item' required >
              <Input id='password'
                prefix={<LockOutlined className='form__icon_color' />}
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

            {formErrorMessage && (
              <label>
                <p className='form_item form__error'>
                  {formErrorMessage}
                </p>
              </label>
            )}

            <Form.Item className='form__item'>
              <div className='form__item_1'>
                <Checkbox id='rememberMe' onChange={handleRememberMe} checked={rememberMe}>
                  Remember me
                </Checkbox>
                <a href='/reset_user' style={{ float: 'right' }}>Forgot password</a>
              </div>
              <div className='form__item_1'>
                <Button type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  disabled={props.isSubmitting}
                  onSubmit={props.handleSubmit}
                >
                  Log in
                </Button>
              </div>
              <a href='/signup'>Register now!</a>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik >
  );
};

export default withRouter(LoginPage);