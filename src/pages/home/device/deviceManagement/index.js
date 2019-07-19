import React from 'react'
import axios from '@/api'
import HomeHeader from '@/components/homeHeader'
import { browserHistory } from 'react-router';
import { Form, Input, Button, Select } from 'antd';
import './index.scss'
let { Option } = Select;
let { TextArea } = Input;
class DeviceManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {            
            formData: [
                {
                    prop: 'name',
                    type: 'text',
                    label: '设备名',
                    rules: '请输入设备名',
                    formItem: 'Input'
                },
                {
                    prop: 'type',
                    type: 'text',
                    label: '型号',
                    rules: '请输入型号',
                    formItem: 'Input'
                },
                {
                    prop: 'num',
                    type: 'number',
                    label: '数量',
                    rules: '请输入数量',
                    formItem: 'Input'
                },
                {
                    prop: 'content',
                    type: 'textarea',
                    label: '描述',
                    rules: '设备介绍',
                    formItem: 'TextArea'
                }                                               
            ]      
        }
    }

    componentDidMount() {
        if(!this.props.location.query.editId) return;
        this.getSingleDevice()
    }

    getSingleDevice = () => {
        axios.getSingleDevice(this.props.location.query.editId)
        .then(res => {
            let { name, num, type, content } = res.data
            this.props.form.setFieldsValue({name, num, type, content})
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
        axios.createDevice(params)
        .then(res => {
            browserHistory.goBack()
        })
    }

    edit = (id, params) => {
        axios.editDevice(id, params)
        .then(res => {
            browserHistory.goBack()
        })
    }

    pageHandle = () => {
        browserHistory.goBack()
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
            <div className='device-management-page'>
                <HomeHeader data={{name: '设备管理', btn: '返回', sign: 'deviceManagement', handle: this.pageHandle}}/>
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

export default Form.create()(DeviceManagement)