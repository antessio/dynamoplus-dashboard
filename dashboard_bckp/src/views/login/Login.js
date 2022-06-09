import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Icon, Input,
    Button, Checkbox
} from 'antd';

import './login.css';
import authProvider from "../../common/authorization/authProvider";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    checkUsername = (rule, value, callback) => {

        // form.setFieldsValue ('pedro, manada');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle login")
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.username)
                console.log(values.password)
                authProvider.login(values.username, values.password)
                    .then(t => console.log(t))
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-container">


                    <h2 style={{color: "red"}}>{process.env.NODE_ENV}</h2>
                    <h2 style={{color: "red"}}>{process.env.REACT_APP_API_BASE_PATH}</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">

                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: 'Please input your username!'}
                                ],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="Username"/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                       type="password" placeholder="Password"/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
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
}

const Login = Form.create()(NormalLoginForm);

export default Login