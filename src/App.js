import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import MovieDetail from './Pages/MovieDetail';
import LoginPage from './Pages/Login';
import Register from './Pages/Register';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from './support/API_URL';
import { Login, keepLogin } from './Redux/Action'
import SeatReservation from './Pages/SeatReservation';
import Admin from './Pages/Admin';
import Cart from './Pages/Cart';
import ChangePass from './Pages/ChangePass'
import TransferHistory from './Pages/TransferHistory';


class App extends Component {
  componentDidMount(){
  //   let username = localStorage.getItem('username')
  //   if(username){
  //     Axios.get(API_URL + `/users?username=${username}`)
  //     .then((res) => {
  //       this.props.Login(res.data[0])
  //     })
  //   }
    this.props.keepLogin()
  }
  render(){
    return (
      <div>
      <Navbar/>
      <Route path='/' component={Home} exact/>
      <Route path='/movie-detail' component={MovieDetail}/>
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={Register} />
      <Route path='/reservation' component={SeatReservation} />
      <Route path='/cart' component={Cart} />
      <Route path='/changepass' component={ChangePass} />
      <Route path='/admin' component={Admin} />
      <Route path='/transferhistory' component={TransferHistory} />
      <Footer/>
    </div>
  );
}
}

export default connect(null, { Login, keepLogin })(App);

//Bikin cancel cart
// bikin checkout
// bikin transaction history  user
// bikin transaction history admin
// bikin change password
// bikin edit cart admin
