import React from 'react'
import {Link} from 'react-router-dom'
import products from '../products';
import {Row,Col,ListGroup,Image,Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = ({match}) => {
    const product = products.find(p => p._id === match.params.id)
    return (
        <>
            <Link className='btn btn-light' to='/'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating 
                               value={product.rating}
                               text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description :{product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>    
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen

//1.Add the flush variant to remove outer borders and rounded corners to render list group items edge-to-edge in a parent container such as a Card.
//2.Image goes out of container so we use fluid to keep it within container
//3.match is for matching url's id with product id to display particular product