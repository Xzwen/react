
import React from 'react'
import Header from '@/components/header'
import SiderBar from '@/components/siderBar'
import './index.scss'

class Home extends React.Component{

    render() {

        return (            
        	<div className='home-page'>
                <Header/>
                <div className='main-content'>
                    <SiderBar/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Home;
