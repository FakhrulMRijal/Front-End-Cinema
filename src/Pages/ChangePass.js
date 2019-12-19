import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';

class ChangePass extends Component {
    state = { password : '', newPassword : '', confirmPassword : '' }

    changePassword = () =>{
        // let username = this.props.username;
        const { id } = this.props.auth;
        let password = this.password.value;
        let newPassword = this.newPassword.value;
        let confirmPassword = this.confirmPassword.value;
        if(newPassword === confirmPassword){
            // Axios.get(API_URL + `/Login?username=${username}&password=${password}`)
            Axios.get(API_URL +`/users/${id}`)
            .then((res) => {
            console.log('res; ', res.data)
            if(res.data.length === 0){
                alert('invalid pass or username')
            }
            else{
                Axios.patch(API_URL+`/users/${id}`, {
                    password: newPassword
                })
                .then((res) => {
                    console.log(res.data)
                    alert('Edit Password Successful')
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    } 
    render() { 
        return ( 
            <div>
                Password
                    <Input type='password' innerRef={(password) => this.password = password}/>
                New Password
                    <Input type='password' innerRef={(newPassword) => this.newPassword = newPassword}/>
                Confirm New Password
                    <Input type='password' innerRef={(confirmPassword) => this.confirmPassword = confirmPassword}/>
                <Button  onClick={this.changePassword}>
                    Click Me !
                </Button>
                </div>
         );
    }
}

const mapStatetoProps = (state) => {
    console.log('STATE: ', state)
    return{
        auth : state.auth
    }
}

export default connect(mapStatetoProps)(ChangePass);