import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import {Link} from 'react-router-dom';

const Product = ({product}) => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${product._id}`} >
                    <Card.Img src={product.image} variant='top'/>
                </Link>

                <Card.Body>
                    <Link to ={`/product/${product._id}`} >
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <div className=''>
                            <Rating 
                               value={product.rating}
                               text={`${product.numReviews} reviews`}
                            />
                        </div>
                    </Card.Text>

                    <Card.Text as='h3'>${product.price}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product

//1. Here we have used ({product}) as props by destructuring props & picking only 'product' 
//2.if we used (props) as params we have to acces the properties as {props.product._id} or {props.product.image} 