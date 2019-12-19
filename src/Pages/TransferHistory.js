import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../support/API_URL'
import { Table } from 'reactstrap'
import { addToCart }  from '../Redux/Action'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';


class History extends Component {
    state = {
        data : [],
        orderAdmin : []
    }

    componentDidMount(){
        const { id } = this.props
        
        Axios.get(API_URL + `/users/${id}`)
        .then((res) => {
            this.setState({data: res.data.order})
        })
        .catch((err) => {
            console.log(err)
        })
        // Axios.get(API_URL + `/users/`)
        // .then((resp) => {
        //     this.setState({orderAdmin: resp.data})
        //     console.log(resp.data)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    renderOutput(){
        console.log('output : ', this.state.data)
        return (
            <tbody>
                {this.state.data.length > 0 && (
                    this.state.data[0].products.map((val, i) => (
                        <tr>
                            <td className='center'>{i + 1}</td>
                            <td>{ this.state.data[0].transactionDate}</td>
                            <td>{val.ticketAmount}</td>
                            <td>{val.totalPrice.toLocaleString()}</td>
                        </tr>
                    ))
                )}
            </tbody>
        )
    }

    // renderAdmin(){
    //     console.log('admin: ', this.state.data)
    //     return (
    //         <tbody>
    //             {this.state.orderAdmin.length > 0 && (
    //                 this.state.orderAdmin.map((val, i) => (
    //                     <tr>
    //                         <td>{val.id}</td>
    //                         <td>{val.username}</td>
    //                         <td>{val.role}</td>
    //                         <td>{val.order}</td>
    //                         <td></td>
    //                         <td></td>
    //                     </tr>
    //                 ))
    //             )}
    //         </tbody>
    //     )

    // }

    renderDetail(){
        console.log('detail : ', this.state.data)
        return (
            <tbody>
                {this.state.data.length > 0 && (
                    this.state.data[0].products.map((val, i) => (
                        <tr>
                            <td className='center'>{i + 1}</td>
                            <td>{ this.state.data[0].transactionDate}</td>
                            <td>{val.ticketAmount}</td>
                            <td>{val.totalPrice.toLocaleString()}</td>
                            <td>
                                <Button href='/' onClick={this.renderOutput()}>
                                    Detail
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        )
    }

    renderHistory(){
        console.log('History: ', this.state.data)
        return (
            <tbody>
                {this.state.data.length > 0 && (
                    this.state.data[0].products.map((val, i) => (
                        <tr>
                            <td className='center'>{i + 1}</td>
                            <td>{ this.state.data[0].transactionDate}</td>
                            <td>{val.ticketAmount}</td>
                            <td>{val.totalPrice.toLocaleString()}</td>
                            <td>
                                <Button>
                                    Detail
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        )
    }

    render() { 
        return ( 
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    {this.renderHistory()}
                </Table>
            </div>
        )}
}

const mapStatetoProps = (state) => {
    console.log('mapstatetoprops: ', state);
    return{
        id: state.auth.id,
        cart: state.auth.cart
    }
}

export default connect(mapStatetoProps, { addToCart })(History);
