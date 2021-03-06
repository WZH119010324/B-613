
import './LoginPage.css';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

// used to show the error message when the pasword is not correct 
function showerror() {
  Modal.error({
    title: 'Error!!!',
    content: 'The password is incorrect!!',
  });
}

function LoginPage() {
// navigate to the login page
  const goToLogin = () => {
    window.location.href="/";
  };
// navigate to home page
  const goToHome = () => {
    window.location.href="/home";
  };
  //navigate to register page
  const goToRegister = () => {
    window.location.href="/register";
  };
  //navigate to administration login page
  const goToAdmin = () => {
    window.location.href="/adminlogin";
  };
  // submit the login data too back end to check whether the information match so that can return the corresponding response
  const Login = () => {
    axios.post('http://localhost:8080/api/login/', {
      userEmail: mail,
      password: password,
    })
    .then(function (response) { 
      console.log(response.data.data[0]);
      cookie.save('id',response.data.data[0].id);
      console.log(response.data.data[0].id);
      cookie.save('userName',response.data.data[0].userName); 
      cookie.save('userEmail',response.data.data[0].userEmail); 
      cookie.save('age',response.data.data[0].age); 
      cookie.save('password',response.data.data[0].password); 
      cookie.save('gender',response.data.data[0].gender); 
      cookie.save('city',response.data.data[0].city);
      cookie.save('picture',response.data.data[0].picture);
      goToHome();
      })
    .catch(function (error) {
      showerror();
      console.log(error);
    });
  };
  
  // self defined state
  const [password,setPassword] = useState('');
  const [mail,setMail] = useState('');

  return (
    <div className="page">
      <div className="totalBox">
        <div className='right' background="./picture/login.jpg" >
          <div className='header'>
            <Button className='Button_h' onClick={goToLogin}>Login</Button>
            <Button className='Button_h' onClick={goToRegister}>Register</Button>
            <Button className='Button_h' onClick={goToAdmin}>Admin</Button>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item>
              <h>Login Into<br></br> Your Account</h>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              className='login-input'
              size='large'
              onChange={(e) => {
                setMail(e.target.value);
                console.log(mail)
              }}
              onClick={(e) => {
                setMail(e.target.value);
                console.log(mail)
              }}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                className='password-input'
                size='large'
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password)
                }}
                onClick={(e) => {
                  setPassword(e.target.value);
                  console.log(password)
                }}
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" style={{color: '#555fa3'}} href="/forgot">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className='item-register'>
              <Button type="primary" className="login-form-button"
              onClick={Login}>
                Log in
              </Button>
              Or <a href="./register" style={{color: '#555fa3'}}>register now!</a>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
