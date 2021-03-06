
import './RegisterPage.css';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { MailOutlined,UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from "axios";

// show the error message when the valid code is not correct
function showerror() {
  Modal.error({
    title: 'Error!!!',
    content: 'The valid code is incorrect!!',
  });
}

function RegisterPage() {
  // navigate to the login page
  const goToLogin = () => {
    window.location.href="/";
  };
  // navigate to register page
  const goToRegister = () => {
    window.location.href="/register";
  };
  //navigate to register success page
  const goToSuccess = () => {
    window.location.href="/success";
  };
 //submit the create new account request and the related data to the back end
  const submit = () => {
    console.log(validCode);
    console.log(mail);
    axios.post('http://localhost:8080/api/codeChecking/', {
      code: validCode,
      userEmail: mail,
    })
  
    .then(function (response) {
      console.log(response.data.state);
      if(response.data.state == "valid"){
      axios.post('http://localhost:8080/api/users/', {
        userName: userName,
        userEmail: mail,
        password: password,
      })
      .then(function (response) {
        goToSuccess();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });}
      else{
        console.log(response);

       alert("verify code is wrong!")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }; 

  // submit the request to the back end so that back end can send the valid code to the user's email
  const submitValid = () => {
    axios.post('http://localhost:8080/api/verifyEmail/', {
      userEmail: mail,
      })
      .then(function (response) {
        console.log(response.data.state);
        if(response.data.state == "valid"){
          axios.post('http://localhost:8080/api/codeSending/', {
                userEmail: mail,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  showerror();
                  console.log(error);
                });
        }
        else{
          console.log("The Email is registered!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }; 

// self defined state
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [mail,setMail] = useState('');
  const [validCode,setValidCode] = useState('');
  return (
    <div className="page">
      <div className="totalBox">
        <div className='right' background="./picture/login.jpg" >
          <div className='header'>
            <Button className='Button_h' onClick={goToLogin}>Login</Button>
            <Button className='Button_h' onClick={goToRegister}>Register</Button>
          </div>
          {/* form that records the new account information */}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item>
              <h>Create<br></br> Your Account</h>
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
                setUserName(e.target.value);
                console.log(userName)
              }}/>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input 
              prefix={<MailOutlined/>}
              placeholder="E-mail"
              size='large'
              onChange={(e) => {
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
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Confirm Password" 
              className='login-input'
              size='large'/>
            </Form.Item>
            

            <Form.Item className='item-register'>
              <Button type="primary" htmlType="submit" className="login-form-button"
              onClick={submit}
              >
                Register
              </Button>
              <Button type="primary" htmlType="submit" className="login-form-button"
              onClick={submitValid}
              >
                Send Verification Code
              </Button>
              <Input 
              prefix={<MailOutlined/>}
              placeholder="ValidCode"
              size='large'
              onChange={(e) => {
                setValidCode(e.target.value);
                console.log(validCode)
              }}/>
              Already have account <a style={{color: '#555fa3'}} href="/">Login</a>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
