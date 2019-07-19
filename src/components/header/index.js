import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { message } from 'antd'
import React from 'react'
import { userInfoAction } from '@/reduxs/action/user'
import './index.scss'

const mapStateToProps = ({userInfoReducer}) => {
    return { userInfoReducer: userInfoReducer }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo(data) {
            dispatch(userInfoAction(data))
        }
    }
}

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    exit = () => {
        browserHistory.push('/')
    }

    componentDidMount() {    
        this.props.getUserInfo()
    }

    render(){
        return (
            <div className='header-component'>
                <div className='portrait-wrap'>
                    <img src={require('@/image/portrait.png')}/>
                    <span>{this.props.userInfoReducer.username}</span>
                </div>
                <span onClick={this.exit} className='header-exit'>退出</span>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)