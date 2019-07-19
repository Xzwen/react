import React from 'react'
import { Button } from 'antd'
import './index.scss'

class HomeHeader extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className='home-header-component'>
                <span>{this.props.data.name}</span>
                {this.props.data.sign!=='main'?<Button type="primary" onClick={this.props.data.handle}>{this.props.data.btn}</Button>:null}
            </div>
        )
    }
}

export default HomeHeader