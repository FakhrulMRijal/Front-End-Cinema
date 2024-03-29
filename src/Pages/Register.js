import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';

class Register extends Component {
    state = { 
        loading: false,
        error: false
     }

    onBtnSignIn = () => {
        let username = this.refs.username.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirmPass = this.refs.confirm.value;
        if(username && password && email && confirmPass.length > 8){
            if(password === confirmPass){
                Axios.get(API_URL +`/users?username=${username}`)
                .then((res) => {
                    if(res.data.length === 0){
                        Axios.post(API_URL +`/users`, {
                            username,
                            password,
                            email,
                            role: 'user'
                        })
                        .then((res) => {
                            this.props.Login(res.data)
                        })
                    }else{
                        alert('Username has been taken!')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                alert('Invalid Password')
            }
        }else{
            alert('Please fill in all the forms!')
        }
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
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <form className='box'>
                    <div className='p-5'>
                        <h1 style={{textAlign:"center"}}>Join Us!</h1>
                    <input type='text' ref='username' className='form-control mt-3' placeholder='Username'/>
                    <input type='text' ref='email' className='form-control mt-3' placeholder='Email'/>
                    <input type='password' ref='password' className='form-control mt-3' placeholder='Password'/>
                    <input type='password' ref='confirm' className='form-control mt-3' placeholder='Confirm Password'/>
                    {
                        this.state.error 
                        ? 
                        <div className='alert alert-danger mt-3'>
                        {this.state.error} 
                        <span onClick={() => this.setState({error : ''})} style={{fontWeight:"bolder", cursor:"pointer", float:"right"} }>x</span></div>
                        :
                        null 
                    }
                    {
                        this.state.loading
                        ?
                        <Loader style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}} type="ThreeDots" color='black'/>
                        :
                        <Button size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black'}} onClick={this.onBtnSignIn} className='form-control mt-3 login-btn pb-1' >Sign Up</Button>
                    }
                    
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p className='mt-3 desc'>
                            Already have an Account? 
                            <Link to='/login'>
                                <span style={{textDecoration : "underline"}}> Login! </span>
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
        username: auth.username
    }
}
 
export default connect(mapStatetoProps, { Login })(Register);