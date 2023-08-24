import React from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import {getSession} from "next-auth/react"
import { useRouter } from 'next/router';

export default function LoginForm(){
    const router = useRouter();
    const onFinish = async (values) => {
        const {email,password} = values;
        try{ 
            const response = await fetch("/api/auth/signup",{
                method:"PATCH",
                body:JSON.stringify({email,password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(response.ok){
                alert("Password Changed");
                router.push("../auth/login");
            }
            
            else{throw new Error("User not found")}
        }catch(err){
            alert("User not found");
        }
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
              <h1>Change Password</h1>
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
                <Input placeholder='Enter your email' className='inputForm'/>
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
                hasFeedback
            >
                <Input.Password  placeholder='Enter your new password' className='inputForm'/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                    min: 8
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password placeholder='Re-enter your new password' className='inputForm'/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width:300}}>
                Change Password
              </Button><br/><br/><hr className='formHr'/>

              <div style={{
                display:'flex',
                justifyContent:'center'
              }}>
                <span>Continue <Link href="../auth/login">Login</Link></span>
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
