import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Input,
    Button, Checkbox
} from 'antd';

import {UserOutlined,LockOutlined} from '@ant-design/icons';
import './login.css';
import authProvider from "../../common/authorization/authProvider";

const FormItem = Form.Item;

const Login = ()=>{
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        
                console.log(values.username)
                console.log(values.password)
                authProvider.login(values.username, values.password)
                    .then(t => console.log(t))
    }

        return (
            <div className="login">
                <div className="login-container">


                    <h2 style={{color: "red"}}>{process.env.NODE_ENV}</h2>
                    <h2 style={{color: "red"}}>{process.env.REACT_APP_API_BASE_PATH}</h2>
                    <Form onFinish={handleSubmit} className="login-form">

                        <FormItem
                            name={"username"}
                            rules={[
                                {required: true, message: 'Please input your username!'}
                            ]}>
                                <Input prefix={<UserOutlined />}
                                       placeholder="Username"/>
                        </FormItem>

                        <FormItem name={"password"} rules={[{required: true, message: 'Please input your Password!'}]}>
                                <Input prefix={<LockOutlined />}
                                       type="password" placeholder="Password"/>
                        </FormItem>

                        <FormItem name={"remember"} initialValue={true} valuePropName={"checked"}>
                                <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="submit" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }



export default Login