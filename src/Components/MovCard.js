import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MovCard = (props) => {
  return (
    
    <div className='mt-5' key={props.id}>
      <Link to={`/movie-detail?id=${props.id}`}>
        <Card style={{width: '250px', cursor: 'pointer'}}>
          <CardImg top width="100%" src={props.image} alt="Card image cap" />
          <CardBody>
            <CardTitle className='movie-title'>{props.title}</CardTitle>
            {
              props.genre.map((val) => {
                return <Button className='btn-custom'  style={{backgroundColor: '#49b675', color: 'white'}} key={props.index}>{val}</Button>
              })
            }
          </CardBody>
        </Card>
        </Link>
    </div>
  );
};

export default MovCard;

