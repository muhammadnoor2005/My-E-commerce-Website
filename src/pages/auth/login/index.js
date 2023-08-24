
import React from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import {getSession, signIn} from "next-auth/react"

export default function LoginForm(){
  const onFinish = (values) => {
    const {email,password} = values;
    signIn("credentials",{
      redirect:true,email,password
    })
    console.log("Login successful");
  };

  return (
    <div className='grandDiv'>
      <img src={"/images/logoWhite.png"} className='logoImg' alt='logo'/>

        <div className='formParentDiv'>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            style={{
              width:300
            }}
          >
            <div style={{display:'flex',justifyContent:'center'}}>
              <h1>Login</h1>
            </div>
            
            <Form.Item
                name="email"
                label="E-mail"
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
                <Input placeholder='john1234@gmail.com' className='inputForm'/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password atleast 8 characters!',
                    min: 8
                },
                ]}
            >
                <Input.Password  placeholder='Enter your password' className='inputForm'/>
            </Form.Item>

            <div style={{
            display:'flex',
            justifyContent:'flex-end'
            }}>
              <Form.Item>
                <Link className="login-form-forgot" href="../auth/forgotPassword">
                  Forgot password?
                </Link>
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:300}}>
                Log in
              </Button><br/><br/>
              
              <hr className='formHr'/>

              <div style={{
                display:'flex',
                justifyContent:'center'
                }}>
              <span>Don't have an account? <Link href="../auth/signup">Sign up</Link></span>
              </div>
            </Form.Item>

          </Form>
        </div>
    </div>
  );
};

export async function getServerSideProps({req}){
  const session =await getSession({req});
  if (session){
    return{
      redirect:{
        destination:"/home/",
        permanent:false,
      }
    }
  }
  return{
    props:{}
  }
}
