import React from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import './index.scss';

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            status: 'login'
        }
    }
    
    goRegister = () => {
        this.setState({status: 'register'})
    }

    goLogin = () => {
        this.setState({status: 'login'})
    }

    render() {
        return (
            <div className='login-page'>
                <div className='login-form-wrap'>
                    {this.state.status==='login'
                        ?<LoginForm registerHandle={this.goRegister}/>
                        :<RegisterForm loginHandle={this.goLogin}/>
                    }
                </div>
            </div>
        )
    }
}
export default Login;