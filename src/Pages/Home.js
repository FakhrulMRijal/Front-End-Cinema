import React, { Component, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


import Axios from 'axios';
import { API_URL } from '../support/API_URL';
import MovCard from '../Components/MovCard';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';


class Home extends Component {
    state = { 
        data: []
     }

    //  const items = [
    //      cccsxscsxddd
    //  ]

    componentDidMount(){
        Axios.get(API_URL +`/movies`)
        .then((res) => {
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderMovies = () => {
        let { data } = this.state
        return data.map((val, index) => {
            return(
                <div className='col-3 custom-card' key={index}>
                    <MovCard 
                        key={index+5}
                        id={val.id}
                        title={val.name} 
                        genre={val.genre} 
                        director={val.director} 
                        duration={val.duration}
                        image={val.image}
                    />
                </div>
            )
        })
    }

    render() { 
        let { data } = this.state;
        // console.log(data)
        if(data === []){
            return(
                <div className='d-flex justify-content-center'>
                    <h1>W</h1>
                    <Loader 
                        type='Circles'
                        color='#DC3545'
                        height={400}
                        width={400}
                    />
                </div>
                )
        }
        return ( 
            <div className='container mt-5'>
                {
                    this.props.username
                    ?
                    <div style={{fontFamily: "sans-serif",textAlign: "center",fontWeight: 500, textDecoration: 'none', color:'#49b675', marginBottom: '10px'}}>
                       <h2> DASHBOARD </h2>
                    </div>
                    :
                    null
                }
                <div className='row justify-content-center'>
                    {this.renderMovies()}
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
 
export default connect(mapStatetoProps)(Home);