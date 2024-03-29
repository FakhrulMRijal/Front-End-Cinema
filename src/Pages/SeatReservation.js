import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL  } from '../support/API_URL';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addToCart } from '../Redux/Action';

class SeatReservation extends Component {
    state = { 
        data: [],
        booked: [[0,0], [0,1]],
        chosen: [],
        price: 0,
        count: 0
    };

    componentDidMount(){
        let {id} = this.props.location.state
        Axios.get(API_URL + `/movies/${id}`)
        .then((res) => {
            this.setState({booked: res.data.booked})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnSeatClick = (newArr) => {
        // console.log(newArr)
        let { chosen, price, count } = this.state;
        // if(chosen.length >= 5){
        //     return null
        // }else{
            chosen.push(newArr);
            this.setState({ 
                chosen,
                price: price + 50000,
                count: count + 1
            })
            // console.log(chosen)
        // }
    }

    onBtnCancelSeat = (arr) => {
        let { chosen, price, count } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            chosen: output,
            price: price - 50000,
            count: count -1
        })
    }

    renderSeat = () => {
        let seats = 100;
        let { chosen, booked } = this.state;
        console.log(booked)
        // let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let arr = [];

        for (let i = 0; i<seats/20; i++){
            arr.push([])
            for (let j = 0; j<seats/(seats/20); j++){
                arr[i].push(1)
            }
        }
    
         for(let k = 0 ; k< booked.length; k++){
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for(let l = 0 ; l< chosen.length; l++){
            arr[chosen[l][0]][chosen[l][1]] = 3
        }

        

        
        return arr.map((val, index) => {
            return(
                <div className='d-flex justify-content-center ' key={index}>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return (
                                    <EventSeatIcon 
                                        key={val.id}
                                        color={"secondary"}
                                        disabled
                                        fontSize={"large"}
                                    />
                                )
                            }
                            if (val1 ===3){
                                return (
                                    <EventSeatIcon 
                                    key={val.id}
                                        color={"primary"}
                                        onClick={() => this.onBtnCancelSeat([index,i])}
                                        fontSize={"large"}
                                    />
                                )
                            }
                            return(
                                <EventSeatIcon 
                                key={val.id}
                                    onClick={() => this.onBtnSeatClick([index, i])} 
                                    fontSize={"large"} 
                                />
                            )
                        })
                    }
                </div>
            )
        })
    }

    addToCart = () => {
        let { cart = [], idUser } = this.props;
        let { name, id, booked } = this.props.location.state;
        let { price, chosen, count } = this.state;
        let addCart = {
            name,
            totalPrice: price,
            seats: chosen,
            ticketAmount: count
        }
        console.log(addCart)
        cart.push(addCart)
        booked.push(...chosen)
        Axios.patch(API_URL + `/users/${idUser}`, {
            cart: cart
        })
        .then((res) => {
            console.log(res.data)
            Axios.patch(API_URL + `/movies/${id}`,{
                booked: booked
            })
            .then((res) => {
                console.log(res.data)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() { 
        // console.log(this.props.location.state)
        let { name } = this.props.location.state;
        console.log('this.props; ', this.props);
        return ( 
            <div className='container full-height'>
                <div className='d-flex justify-content-center'>
                    <h1>Choosing Seats for {name}</h1>
                </div>
                    {this.renderSeat()}
                <div style={{float: 'right'}}>
                    <h3>
                        Rp. {this.state.price.toLocaleString()}
                    </h3>
                    <h3>
                        {this.state.count} Seats
                    </h3>
                    <Button color='success' onClick={this.addToCart}>
                        Add To Cart
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return{
        idUser: auth.id,
        cart: auth.cart
    }
}
 
export default connect(mapStatetoProps, { addToCart })(SeatReservation);