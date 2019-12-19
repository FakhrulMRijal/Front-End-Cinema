import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Login } from '../Redux/Action';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';

class LoginPage extends Component {
    state = { 
        error: false
    }
    
    onBtnLogIn = () => {
        let { Login } = this.props;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        Axios.get(API_URL + `/users?username=${username}&password=${password}`)
        .then((res) => {
            if(res.data.length === 0){
                alert('Invalid Username or Password')
            }else{
                console.log(res.data)
                Login(res.data[0])
                localStorage.setItem('username', res.data[0].username)
                this.props.history.push('/');
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    
    render() {
        console.log(this.props.username)
        if(this.props.username){
            return(
                <Redirect to='/'>

                </Redirect>
            )
        }
        return ( 
            <div className='container' >
                <div className='d-flex justify-content-center'>
                    <form className='box mt-5 mb-5'>
                    <div className='p-5'>
                        <h1 style={{textAlign:"center", color:"#49b675"}}>Welcome In the Cinema!</h1>
                    <input ref='username' type='text' className='form-control mt-3' placeholder='Username'/>
                    <input ref='password' type='password' className='form-control mt-3' placeholder='Password'/>
                    {
                        this.state.error 
                        ? 
                        <div className='alert alert-danger mt-3'>
                        {this.state.error} 
                        <span onClick={() => this.setState({error : ''})} style={{fontWeight:"bolder", cursor:"pointer", float:"right"} }>x</span></div>
                        :
                        null 
                    }
                    <Button size='lg' style={{borderRadius:'24px', backgroundColor:'#49b675', color:'white', marginTop: '20px'}} className='form-control login-btn' onClick={this.onBtnLogIn}>Sign In</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3' style={{color:'#49b675'}}>
                            Don't have an account? 
                        <Link to='/register'>
                            <span style={{textDecoration : "underline", color:'#49b675'}}> Create account in here! </span>
                        </Link>
                        </p>
                    </div>
                    </form>
                </div>
            </div>
         );
    }
}


const mapStatetoProps = ({ auth }) => {
    return{
        username: auth.username,
        password: auth.password
    }
}
 
export default connect(mapStatetoProps, { Login })(LoginPage);