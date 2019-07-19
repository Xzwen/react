import React from 'react'
import axios from '@/api'
import { browserHistory } from 'react-router'
import { Table, Icon, message, Popconfirm } from 'antd'
import HomeHeader from '@/components/homeHeader'
import { timeFilter } from '@/utils'
import './index.scss'

class Device extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            total: 0,
            limit: 20,            
            columns: [{
                title: '设备名',
                dataIndex: 'name',
                align: 'center'
                }, {
                title: '型号',
                dataIndex: 'type',
                align: 'center'
                }, {
                title: '数量',
                dataIndex: 'num',
                align: 'center'
                }, {
                title: '描述',
                dataIndex: 'content',
                align: 'center'
                }, {
                title: '创建时间',
                dataIndex: 'createdAt',
                align: 'center'
                }, {
                title: '管理',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Icon type="edit" onClick={this.manageDevice.bind(this, record)} theme="twoTone" twoToneColor="#1890ff" />
                        <Popconfirm title="确定删除此设备?" icon={<Icon type="info-circle" style={{ color: 'red' }}/>} onConfirm={this.delDevice.bind(this, record)} okText="确定" cancelText="取消">
                            <Icon type="delete" theme="twoTone" twoToneColor="#FF1493" />
                        </Popconfirm>
                    </span>
                )
            }]
        }
    }

    manageDevice(item) {
        browserHistory.push({
            pathname: '/home/device/deviceManagement',
            query: {editId: item._id}
        })
    }

    pageHandle = () => {
        browserHistory.push('/home/device/deviceManagement')
    }    

    getDeviceData = (pages) => {
        axios.device({where: {limit: this.state.limit, sort: {createdAt: -1}, page: pages}})
        .then(res => {
            this.setState({
                tableData: res.data.docs,
                total: res.data.total
            })
        })
    }

    delDevice(item) {
        axios.delDevice(item._id)
        .then(res => {
            message.success('删除成功')
            this.getDeviceData(1)
        })
        .catch(() => {
            message.error('删除失败')
        })
    }

    componentDidMount() {
        this.getDeviceData(1)
    }

    changeHandle = (pagination) => {
        this.getDeviceData(pagination.current)
    }

    render(){
        for(let item of this.state.tableData) {
            if(item.createdAt) {item.createdAt = timeFilter(item.createdAt)}
        }        
        return (
            <div className='device-page'>
                <HomeHeader data={{name: '设备页面', sign: 'device', btn: '添加', handle: this.pageHandle}}/>                
                <div className='table-wrap'>
                    <Table
                        pagination={{total: this.state.total, pageSize: this.state.limit, size: 'middle'}}
                        onChange={this.changeHandle} columns={this.state.columns}
                        dataSource={this.state.tableData} rowKey={record => record._id}
                        size='middle'
                    />
                </div>
            </div>
        )
    }
}

export default Device