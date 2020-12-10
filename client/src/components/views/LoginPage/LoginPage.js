import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Typography } from 'antd';
import { Form, FormItem, Input, SubmitButton, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AllActions from '../../../redux/actions/allActions';
import './LoginPage.css';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  // rememberMe holds the user email
  const [formError, setFormError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberData, setRememberData] = useState(
    {
      email: '',
      password: ''
    }
  );

  // Run only 1 time after render
  useEffect(() => {
    const data = localStorage.getItem('rememberData');
    if (data) {
      setRememberMe(true);
      setRememberData(JSON.parse(data));
    }
  }, []);

  // Run when userState is changed
  useEffect(() => {
    if (userState.logSuccess === true) {
      if (rememberMe === true) {
        console.log(rememberData);
      }

      // if (rememberMe === true) {
      //   window.localStorage.setItem('rememberMe', values.id);
      // } else {
      //   localStorage.removeItem('rememberMe');
      // }
      props.history.push('/');
    }
    else if (userState.logSuccess === false) {
      setFormError("Sorry, we couldn't login your account. Please check your information again!");
    }
  }, [props.history, userState, rememberMe, rememberData]);

  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      // Initial values
      initialValues={{
        email: rememberData.email,
        password: rememberData.password,
      }}

      // Validation Schema
      validationSchema={signinValidationSchema}

      // onSubmit handler
      onSubmit={(values, actions) => {
        setTimeout(() => {
          const creds = {
            email: values.email,
            password: values.password
          };

          if (rememberMe)
            setRememberData(creds);

          dispatch(AllActions.UserActions.signinUser(creds))
            .then(
              () => {
                actions.setSubmitting(false);
              }
            )
        }, 500);
      }}
    >
      {(props) => (
        <div className='app'>
          <Title level={2}>Log In</Title>
          <Form className='form'>
            <FormItem
              className='form__item'
              name='email'
              required={true}
            >
              <Input
                name='email'
                prefix={<UserOutlined className='form__icon_color' />}
                placeholder='Enter your email'
              />
            </FormItem>

            <FormItem
              className='form__item'
              name='password'
              required={true}
            >
              <Input.Password
                name='password'
                prefix={<LockOutlined className='form__icon_color' />}
                placeholder='Enter your password'
              />
            </FormItem>
            {formError && (
              <label>
                <p className='form__item form__error'>
                  {formError}
                </p>
              </label>
            )}
            <div>
              <Checkbox
                name='rememberMe'
                onChange={() => setRememberMe(!rememberMe)}
                checked={rememberMe}
              >
                Remember me
              </Checkbox>
              <a href='/reset_user' style={{ float: 'right' }}>Forgot password</a>
            </div>
            <div className='form__item_1'>
              <SubmitButton className='login-form-button'>
                Log in
              </SubmitButton>
              <a href='/signup'>Register now!</a>
            </div>
          </Form>
        </div>
      )
      }
    </Formik >
  );
};

export default withRouter(LoginPage);