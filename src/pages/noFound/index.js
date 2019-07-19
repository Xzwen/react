
import React from 'react';
import { browserHistory } from 'react-router'
import './index.scss';

class NoFound extends React.Component{

    routeBack = () => {
        window.history.back();
    }

    render() {
        return (
        	<div className='noFound-page'>
                <img src={require('@/image/nofound.jpg')} onClick={this.routeBack}/>
            </div>
        )
    }
}
export default NoFound;
