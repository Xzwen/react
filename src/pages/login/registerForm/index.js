
import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import md5 from 'md5'
import salt from '@/utils/salt'
import './index.scss'

class RegisterForm extends React.Component {
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
                },
                {
                    prop: 'confirmPass',
                    type: 'password',
                    icon: 'lock',
                    placeholder: '确认密码',
                    rules: '请输入确认密码'
                }                                
            ]
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if(err) return
            if(values.password !== values.confirmPass) return message.error('密码不一致')
            let params = {username: values.username, password: md5(`${values.password}${salt.salt}`)}
            window.$api.register(params)
            .then(res => {
                message.success('注册成功')
            })
            .catch(err => {
                message.error(err)
            })
        })
    }

    backLogin = () => {
        this.props.loginHandle()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className='register-form'>
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
                    <span onClick={this.backLogin} className='router-btn'>返回登录</span>
                    <Button type="primary" htmlType="submit" className="register-form-btn">注册</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(RegisterForm)