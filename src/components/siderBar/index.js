
import React from 'react'
import { browserHistory, Link } from 'react-router'
import { Menu, Icon } from 'antd';
import axios from '@/api'
import './index.scss'

const SubMenu = Menu.SubMenu;

class SiderBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeStyle: 0,
            routeName: '/home/main'
        }  
    }

    routeLink(params){
        this.setState({
            activeStyle: params.state.sign
        })
        browserHistory.push({
            pathname: params.path
        })
        this.getPageName = this.getPageName.bind(this)
    }

    getPageName(){
        let routeName = browserHistory.getCurrentLocation().pathname
        let tempArr = routeName.split('/')
        if(!tempArr.length || !tempArr[2]) return
        this.setState({
            routeName: `/${tempArr[1]}/${tempArr[2]}`
        })
        // let pageName = routeName.split('/')[2]
        // let pageNameHandle = params => {
        //     switch(params) {
        //         case 'main':
        //             return 0
        //         case 'meeting':
        //             return 1
        //         case 'device':
        //             return 2
        //         case 'users':
        //             return 3
        //         default:
        //             return 0
        //     }        
        // }
        // this.setState({
        //     activeStyle: pageNameHandle(pageName)
        // })

    }

    nodeClick = (item) => {
        if(item.key.indexOf('vinter') !== -1) return;
        browserHistory.push(item.key)
    }

    //  生命周期函数  相当于vue mounted(改变state会触发两次render)
    componentDidMount() {
    }
    
    //  之前渲染  相当于vue created
    componentWillMount() {
        this.getPageName()
    }

    render(){
        return (
            <div className='siderbar-component'>
                <Menu
                    defaultSelectedKeys={[this.state.routeName]}
                    defaultOpenKeys={['vinter1']}
                    mode="inline"
                    theme="dark"
                    onClick={this.nodeClick}
                    // inlineCollapsed={this.state.collapsed}
                    >
                    <Menu.Item key="/home/main">
                        <Icon type="home" />
                        <span>系统主页</span>
                    </Menu.Item>
                    <Menu.Item key="/home/meeting">
                        <Icon type="team" />
                        <span>会议页面</span>
                    </Menu.Item>
                    <Menu.Item key="/home/device">
                        <Icon type="desktop" />
                        <span>设备页面</span>
                    </Menu.Item>
                    <Menu.Item key="/home/users">
                        <Icon type="user" />
                        <span>人员页面</span>
                    </Menu.Item>
                    <SubMenu key="vinter1" title={<span><Icon type="appstore" /><span>其他页面</span></span>}>
                        <Menu.Item key="vinter2">公司制度</Menu.Item>
                        <Menu.Item key="vinter3">公司文化</Menu.Item>
                    </SubMenu>
                </Menu>
                {/* <ul>
                    <li><Link to='/home/meeting'>会议页面</Link></li>
                    <li><Link to='/home/device'>设备页面</Link></li>
                    <li><Link to='/home/users'>人员页面</Link></li>
                    <li className={`sider-tab ${this.state.activeStyle===0?'active-tab-style':null}`} onClick={this.routeLink.bind(this, {path: '/home/main', state: {sign: 0}})}>系统主页</li>
                    <li className={`sider-tab ${this.state.activeStyle===1?'active-tab-style':null}`} onClick={this.routeLink.bind(this, {path: '/home/meeting', state: {sign: 1}})}>会议页面</li>
                    <li className={`sider-tab ${this.state.activeStyle===2?'active-tab-style':null}`} onClick={this.routeLink.bind(this, {path: '/home/device', state: {sign: 2}})}>设备页面</li>
                    <li className={`sider-tab ${this.state.activeStyle===3?'active-tab-style':null}`} onClick={this.routeLink.bind(this, {path: '/home/users', state: {sign: 3}})}>人员页面</li>
                </ul> */}
            </div>
        )
    }
}

export default SiderBar