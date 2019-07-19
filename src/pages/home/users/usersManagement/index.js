import React from 'react'
import axios from '@/api'
import moment from 'moment';
import HomeHeader from '@/components/homeHeader'
import { browserHistory } from 'react-router';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import md5 from 'md5'
import salt from '@/utils/salt'
import './index.scss'

let { Option } = Select;

class UsersManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formData: [
                {
                    prop: 'username',
                    type: 'text',
                    label: '用户名',
                    rules: '请输入用户名',
                    formItem: 'Input'
                },
                {
                    prop: 'password',
                    type: 'password',
                    label: '密码',
                    rules: '请输入密码',
                    formItem: 'Input'
                },
                {
                    prop: 'sex',
                    type: 'text',
                    label: '性别',
                    rules: '请选择性别',
                    formItem: 'Select'
                },
                {
                    prop: 'birthday',
                    type: 'text',
                    label: '出生日期',
                    rules: '请选择出生日期',
                    formItem: 'Date'
                },
                {
                    prop: 'phone',
                    type: 'text',
                    label: '手机',
                    rules: '请输入手机',
                    formItem: 'Input'
                },
                {
                    prop: 'email',
                    type: 'text',
                    label: '邮箱',
                    rules: '请输入邮箱',
                    formItem: 'Input'
                },
                {
                    prop: 'abstract',
                    type: 'text',
                    label: '座右铭',
                    rules: '请输入座右铭',
                    formItem: 'Input'
                }                                                
            ]            
        }
    }

    componentDidMount() {
        if(!this.props.location.query.editId) return;
        this.getSingleUsers()
    }
    
    getSingleUsers = () => {
        axios.getSingleUsers(this.props.location.query.editId)
        .then(res => {
            let { username, sex, birthday, phone, email, abstract } = res.data
            if(birthday) birthday = moment(birthday)
            this.props.form.setFieldsValue({
                username: username,
                password: '',
                sex: sex,
                birthday: birthday,
                phone: phone,
                email: email,
                abstract: abstract
            })            
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return
            values.password ? values.password = md5(`${values.password}${salt.salt}`) : null
            this.props.location.query.editId ? this.edit(this.props.location.query.editId, values) : this.save(values)
        });
    }

    save = (params) => {
        axios.createUsers(params)
        .then(res => {
            browserHistory.goBack()
        })
    }

    edit = (id, params) => {
        if(!params.password) delete params.password
        axios.editUsers(id, params)
        .then(res => {
            browserHistory.goBack()
        })
    }

    pageHandle = () => {
        browserHistory.goBack()
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 24 },
              md: { span: 4 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
              md: { span: 18 }
            },
        };              
        return (
            <div className='users-management-page'>
                <HomeHeader data={{name: '人员管理', btn: '返回', sign: 'usersManagement', handle: this.pageHandle}}/>
                <Form onSubmit={this.handleSubmit} >
                    {
                        this.state.formData.map((item, index) => 
                            <Form.Item key={index} {...formItemLayout} label={item.label}>
                                {
                                    getFieldDecorator(item.prop, {
                                        rules: [{required: this.props.location.query.editId?false:true, message: item.rules}]
                                    })(
                                        item.formItem==='Input'
                                        ?<Input size='large' type={item.type} placeholder={item.label}/>
                                        :item.formItem==='Select'
                                        ?<Select size='large' placeholder={item.label}>
                                            <Option value="male">男</Option>
                                            <Option value="female">女</Option>
                                        </Select>
                                        :<DatePicker size='large' showTime format="YYYY-MM-DD HH:mm:ss" placeholder={item.label}/>
                                    )
                                }
                            </Form.Item>
                        )
                    }
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 24, offset: 0 },
                            md: { span: 20, offset: 4 }
                        }}
                    >
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>        
        )
    }
}

export default Form.create()(UsersManagement)