import React from 'react'
import axios from '@/api'
import HomeHeader from '@/components/homeHeader'
import { browserHistory } from 'react-router';
import { Form, Input, Button, Select } from 'antd';
import './index.scss'
let { Option } = Select;
let { TextArea } = Input;
class MeetingManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {            
            formData: [
                {
                    prop: 'theme',
                    type: 'text',
                    label: '主题',
                    rules: '请输入会议主题',
                    formItem: 'Input'
                },
                {
                    prop: 'creator',
                    type: 'text',
                    label: '创建人',
                    rules: '请选择创建人',
                    formItem: 'Select'
                },
                {
                    prop: 'address',
                    type: 'text',
                    label: '地址',
                    rules: '请输入地址',
                    formItem: 'Input'
                },
                {
                    prop: 'content',
                    type: 'textarea',
                    label: '会议内容',
                    rules: '请输入会议内容',
                    formItem: 'TextArea'
                }                                               
            ],
            selectData: []            
        }
    }

    componentDidMount() {
        this.getUsers()
        if(!this.props.location.query.editId) return;
        this.getSingleMeeting()
    }
    
    getUsers = () => {
        axios.users()
        .then(res => {
            this.setState({selectData: res.data.docs})
        })        
    }

    getSingleMeeting = () => {
        axios.getSingleMeeting(this.props.location.query.editId)
        .then(res => {
            let { theme, creator, address, content } = res.data
            this.props.form.setFieldsValue({theme, creator:creator._id, address, content})
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return
            this.props.location.query.editId ? this.edit(this.props.location.query.editId, values) : this.save(values)
        });
    }

    save = (params) => {
        axios.createMeeting(params)
        .then(res => {
            browserHistory.push('/home/meeting')
        })
    }

    edit = (id, params) => {
        axios.editMeeting(id, params)
        .then(res => {
            browserHistory.push('/home/meeting')
        })
    }

    pageHandle = () => {
        browserHistory.push('/home/meeting')
    }

    render(){
        const { getFieldDecorator } = this.props.form
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
            }
        };              
        return (
            <div className='meeting-management-page'>
                <HomeHeader data={{name: '会议管理', btn: '返回', sign: 'meetingManagement', handle: this.pageHandle}}/>
                <Form onSubmit={this.handleSubmit} >
                    {
                        this.state.formData.map((item, index) => 
                            <Form.Item key={index} {...formItemLayout} label={item.label}>
                                {
                                    getFieldDecorator(item.prop, {
                                        rules: [
                                            {   
                                                required: true,
                                                message: item.rules
                                            }
                                        ]
                                    })(
                                        item.formItem==='Input'
                                        ?<Input size='large' type={item.type} placeholder={item.label}/>
                                        :item.formItem==='Select'
                                        ?<Select size='large' placeholder={item.label} >
                                            {this.state.selectData.map(item =>
                                                <Option value={item._id} key={item._id}>{item.username}</Option>
                                            )}
                                        </Select>
                                        :<TextArea placeholder={item.label} rows={6}/>
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

export default Form.create()(MeetingManagement)