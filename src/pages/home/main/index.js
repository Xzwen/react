import React from 'react'
import HomeHeader from '@/components/homeHeader'
import './index.scss'

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render(){
        return (
            <div className='main-page'>
                <HomeHeader data={{name: '系统主页', sign: 'main'}}/>
                <div className='main-content'>Welcome to my meeting</div>
            </div>
        )
    }
}

export default Main;