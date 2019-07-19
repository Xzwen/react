import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import md5 from 'md5'
import salt from '@/utils/salt'
import './index.scss';
  
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: [
                {
                    prop: 'username',
                    type: 'text',
                    icon: 'user',
                    placeholder: '用户名',
                    rules: '请输入用户名'
                },
                {
                    prop: 'password',
                    type: 'password',
                    icon: 'lock',
                    placeholder: '密码',
                    rules: '请输入密码'
                } 
            ]            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if(err) return
            let params = {username: values.username, password: md5(`${values.password}${salt.salt}`)}
            window.$api.login(params)
            .then(res => {
                window.localStorage.setItem('authToken', res.data.token)
                browserHistory.push("/home")
            })
            .catch(err => {
                message.error(err)
            })
        })
    }

    registerUser = () => {
        this.props.registerHandle()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className='form-title'>电子书包教学平台</div>
                {
                    this.state.formData.map((item, index) => 
                        <Form.Item key={index}>
                            {
                                getFieldDecorator(item.prop, {
                                    rules: [{required: true, message: item.rules}]
                                })(
                                    <Input size='large' type={item.type} prefix={<Icon type={item.icon} style={{color: 'rgba(0,0,0,0.25)'}}/>} placeholder={item.placeholder}/>
                                )
                            }
                        </Form.Item>
                    )
                }
                <Form.Item>
                    <span onClick={this.registerUser} className='router-btn'>注册新用户</span>
                    <Button type="primary" htmlType="submit" className="login-form-btn">登录</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(LoginForm)