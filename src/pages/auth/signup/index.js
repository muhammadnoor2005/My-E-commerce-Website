import {getSession} from "next-auth/react"
import {
  Button,
  Form,
  Input,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignupForm (){
  const router = useRouter()
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try{ 
        const response = await fetch("/api/auth/signup",{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(response.ok){
            alert("Sign up successful");
            router.push("../auth/login");
        }
        else{throw new Error("Email already exits")}

    }catch(err){
        alert(err);
    }
};

return (
    <div className='ima'>
        <img src={"/images/logoWhite.png"} className='logoImg' alt='logo' priority={true}/>

        <div className='parentDivSignup' >
            <Form
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                width:300,
            }}
            scrollToFirstError
            >

            <div style={{display:'flex',justifyContent:'center'}}>
                <h1>Sign up</h1>
            </div>

            <Form.Item
                name="fullName"
                label="Full name"
                rules={[
                {
                    type: 'text',
                    message: 'The input is not valid',
                },
                {
                    required: true,
                    message: 'Please enter your full name',
                },
                ]}
            >
                <Input placeholder='John Doe' className='inputForm'/>
            </Form.Item>

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
                hasFeedback
            >
                <Input.Password  placeholder='Create your password' className='inputForm'/>
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
                <Input.Password placeholder='Re-enter your password' className='inputForm'/>
            </Form.Item>


            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please enter valid phone number!',
                    len:11
                },
                ]}
            >
                <Input type='number' placeholder='03123456789' className='inputForm'/>
            </Form.Item>

            <div style={{display:'flex',justifyContent:'center'}}>
                <Form.Item >
                <Button type="primary" htmlType="submit" style={{width:"300px"}}>
                Register
                </Button>

                <br/><br/><hr className='formHr'/>

                <div style={{
                    display:'flex',
                    justifyContent:'center'
                    }}>
                    <span>Already have an account? <Link href="../auth/login">Login</Link></span>
                </div>
                </Form.Item>
            </div>
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
