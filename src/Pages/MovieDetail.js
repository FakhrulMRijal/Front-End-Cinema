import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import { Button, Badge } from 'reactstrap';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MovieDetail extends Component {
    state = { 
        data: [],
        redirectLogin : false,
        redirectPurchase: false
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        console.log(this.props.location.search)
        Axios.get(API_URL+`/movies/${id}`)
        .then((res) => {
            this.setState({data: res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderGenreButton = () => {
        let { genre } = this.state.data;
        if(genre){
            return genre.map((val, index) => {
                return <Button className='btn-custom' style={{backgroundColor: '#49b675',color: 'white'}} key={index}>{val}</Button>
            })
        }
    }

    

    onBtnReservation = () => {
        let { username } = this.props;
        if(username){
            this.setState({ redirectPurchase: true })
        }else{
            this.setState({ redirectLogin: true})
        }
    }

    render() { 
        let { data, redirectLogin, redirectPurchase } = this.state;
        if(redirectLogin){
            return(
                <Redirect to='/login' />
            )
        }else if(redirectPurchase){
            return(
                <Redirect to={{ pathname : '/reservation', state: this.state.data}}/>
            )
        }
        if(data === []){
            return(
                <div className='d-flex justify-content-center'>
                    <Loader 
                        type='Circles'
                        color='#DC3545'
                        height={200}
                        width={200}
                    />
                </div>
                )
        }else{

            return ( 
                <div className='container full-height' style={{marginTop:25}}>
                <div className='row'>
                    <div className='col-4'>
                        <iframe
                            width="320"
                            height="280"
                            src={data.video}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        />
                    <div className='vertical' style={{float: 'center'}}>
                            <Button style={{backgroundColor: 'Gold', color: 'black', width: 320}} onClick={this.onBtnReservation}><b>Booking Seats</b></Button>
                    </div>    
                    </div>
                    
                    <div className='col-8'>
                        <div className='vertical-spacing'>
                            <h2>
                                 {data.name}
                            </h2>
                        </div>
                        <div>
                        <Badge style={{backgroundColor: 'blue',float: 'Right', fontSize: '16px', borderRadius: '30px'}}>{data.age}</Badge>
                        </div>
                        <div className='vertical-spacing'>
                            Casts By : {data.casts}
                        </div>
                        <div className='vertical-spacing'>
                            Director by : {data.director}
                        </div>
                        <div className='vertical-spacing'>
                            Duration: {data.duration} Minutes
                        </div>
                        <div className='vertical-spacing'>
                            {this.renderGenreButton()}
                        </div>
                        <div className='vertical-spacing'>
                            {data.synopsis}
                        </div>
                    </div>
                </div>
            </div>
         );
        }
    }
}

const mapStateToProps = ({auth}) => {
    return{
        username : auth.username
    }
}
 
export default connect(mapStateToProps)(MovieDetail);