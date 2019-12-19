import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { addToCart }  from '../Redux/Action'
import { Table } from 'reactstrap'

class Cart extends Component {
    state = { 
        data: [],
        totalPrice: 0
    }

    componentDidMount(){
        // id ambil dari global state
        // connect react-redux
        const { id } = this.props
        
        Axios.get(API_URL +`/users/${id}`)
        .then((res) => {
            this.setState({data: res.data.cart})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCart() {
        console.log('this.state.data', this.state.data)
        
        //map isi this.state.data
        // map jadi tbody === html
        // TableRow === reactstrap
        return (
            <tbody>
                {this.state.data.length > 0 && (
                    this.state.data.map((val, i) => (
                        <tr>
                            <td className='center'>{i + 1}</td>
                            <td>{val.name}</td>
                            <td>{val.seats.join(' ') }</td>
                            <td>{val.ticketAmount}</td>
                            <td>{val.totalPrice.toLocaleString()}</td>
                            <td>
                                <Button onClick={() => this.cancelBooking(i)}>
                                    Cancel Booking
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        )
    }

      
   
    totalCart(){
        // console.log('masuk')
        const { data } = this.state;
        const { id } = this.props;
        let total = 0
        for(let i = 0; i < data.length; i++){
            total += data[i].totalPrice
        }
        // console.log('total: ', total);
        // return total
        this.setState({
            totalPrice: total
        });
        const order = {
            products: data,
            transactionDate: new Date()
        }
        console.log('order: ', order)
        Axios.patch(API_URL + `/users/${id}`, {
            cart: [],
            order: [order]
        })
        // Axios.post(API_URL + `/users/${id}`, order)
    }

    cancelBooking(i) {
        // console.log('data')
        // const { data } = this.state;
        // Axios.delete(API_URL + `/users/${id}` )
        // .then((res) => {
        //     console.log('res', res)
        //     this.setState({data: res.data.cart})
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        // let { cart = [], id } = this.props;
        // let { name, booked } = this.props.location.state;
        // let { price, chosen, count } = this.state;
        // let cancelCart = {
        //     // name,
        //     totalPrice: price,
        //     seats: chosen,
        //     ticketAmount: count
        // }
        // console.log(cancelCart)
        // cart.splice(cancelCart)
        // booked.splice(...chosen)
        // Axios.delete(API_URL + `users/${id}`),{
        //     cart : cart
        // }
        // .then((res) => {
        //     console.log(res.data)
        //     booked : booked
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
        const { id } = this.props;
        const { data } = this.state;
        data.splice(i, 1)

        this.setState({
            data: data
        })
        
        Axios.patch(API_URL +`/users/${id}`, {
            cart: data
        })
    }

    render() { 
        return ( 
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Movie Title</th>
                            <th>Seats</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {this.renderCart()}
                    <tfoot>
                        <tr>
                            <td>
                                {this.state.totalPrice.toLocaleString()}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                <Button onClick={() => this.totalCart()}>
                    Total 
                </Button>
            </div>    
        );
    }
}
 
const mapStatetoProps = (state) => {
    console.log('mapstatetoprops: ', state);
    return{
        id: state.auth.id,
        cart: state.auth.cart
    }
}
 
export default connect(mapStatetoProps, { addToCart })(Cart);