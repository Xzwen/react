import React from 'react'
import axios from '@/api'
import { browserHistory } from 'react-router'
import { Table, Icon, message, Popconfirm } from 'antd'
import HomeHeader from '@/components/homeHeader'
import { timeFilter } from '@/utils'
import './index.scss'

class Meeting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            total: 0,
            limit: 20,            
            columns: [{
                title: '主题',
                dataIndex: 'theme',
                align: 'center'
                }, {
                title: '内容',
                dataIndex: 'content',
                align: 'center'
                }, {
                title: '地址',
                dataIndex: 'address',
                align: 'center'
                }, {
                title: '创建人',
                dataIndex: 'creator.username',
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
                        <Icon type="edit" onClick={this.manageMeeting.bind(this, record)} theme="twoTone" twoToneColor="#1890ff" />
                        <Popconfirm title="确定删除此会议?" icon={<Icon type="info-circle" style={{ color: 'red' }}/>} onConfirm={this.delMeeting.bind(this, record)} okText="确定" cancelText="取消">
                            <Icon type="delete" theme="twoTone" twoToneColor="#FF1493" />
                        </Popconfirm>
                    </span>
                )
            }]
        }
    }

    manageMeeting(item) {
        browserHistory.push({
            pathname: '/home/meeting/meetingManagement',
            query: {editId: item._id}
        })
    }

    pageHandle = () => {
        browserHistory.push('/home/meeting/meetingManagement')
    }    

    getMeetingData = (pages) => {
        axios.meeting({where: {limit: this.state.limit, sort: {createdAt: -1}, page: pages}})
        .then(res => {
            this.setState({
                tableData: res.data.docs,
                total: res.data.total
            })
        })
    }

    delMeeting(item) {
        axios.delMeeting(item._id)
        .then(res => {
            message.success('删除成功')
            this.getMeetingData(1)
        })
        .catch(() => {
            message.error('删除失败')
        })
    }

    componentDidMount() {
        this.getMeetingData(1)
    }

    changeHandle = (pagination) => {
        this.getMeetingData(pagination.current)
    }

    render(){
        for(let item of this.state.tableData) {
            if(item.createdAt) {item.createdAt = timeFilter(item.createdAt)}
            if(item.birthday) {item.birthday = timeFilter(item.birthday)}
        }
        return (
            <div className='meeting-page'>
                <HomeHeader data={{name: '会议页面', btn: '添加', sign: 'meeting', handle: this.pageHandle}}/>
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

export default Meeting