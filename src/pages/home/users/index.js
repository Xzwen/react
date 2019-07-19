import React from 'react'
import axios from '@/api'
import { browserHistory } from 'react-router'
import { Table, Icon, message, Popconfirm } from 'antd'
import HomeHeader from '@/components/homeHeader'
import { timeFilter } from '@/utils'
import './index.scss'

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            total: 0,
            limit: 2,
            columns: [{
                title: '用户名',
                dataIndex: 'username',
                align: 'center'
                }, {
                title: '性别',
                dataIndex: 'sex',
                align: 'center'
                }, {
                title: '出生日期',
                dataIndex: 'birthday',
                align: 'center'
                }, {
                title: '手机',
                dataIndex: 'phone',
                align: 'center'
                }, {
                title: '邮箱',
                dataIndex: 'email',
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
                        <Icon type="edit" onClick={this.manageUsers.bind(this, record)} theme="twoTone" twoToneColor="#1890ff" />
                        <Popconfirm title="确定删除此会议?" icon={<Icon type="info-circle" style={{ color: 'red' }}/>} onConfirm={this.delUsers.bind(this, record)} okText="确定" cancelText="取消">
                            <Icon type="delete" theme="twoTone" twoToneColor="#FF1493" />
                        </Popconfirm>
                    </span>
                )
            }]
        }
    }

    manageUsers(item) {
        browserHistory.push({
            pathname: '/home/users/usersManagement',
            // query: {editId: item._id}
            query: {editId: item.id}
        })
    }
    pageHandle = () => {
        browserHistory.push('/home/users/usersManagement')
    }    

    getUsersData = (pages) => {
        axios.users({where: {limit: this.state.limit, sort: {createdAt: -1}, page: pages}})
        .then(res => {
            this.setState({
                tableData: res.data.rows,
                total: res.data.count
                // tableData: res.data.docs,
                // total: res.data.total
            })
        })
    }

    delUsers(item) {
        // axios.delUsers(item._id)
        axios.delUsers(item.id)
        .then(res => {
            message.success('删除成功')
            this.getUsersData(1)
        })
        .catch(() => {
            message.error('删除失败')
        })
    }    

    changeHandle = (pagination) => {
        this.getUsersData(pagination.current)
    }    

    componentDidMount() {
        this.getUsersData(1)
    }

    render(){
        for(let item of this.state.tableData) {
            if(item.createdAt) {item.createdAt = timeFilter(item.createdAt)}
            if(item.birthday) {item.birthday = timeFilter(item.birthday)}
        }
        return (
            <div className='users-page'>
                <HomeHeader data={{name: '人员页面', btn: '添加', sign: 'users', handle: this.pageHandle}}/>
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

export default Users