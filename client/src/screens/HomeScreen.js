import React from 'react'
import { Col, Row } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <>
            <h1>Latests Products</h1>
            <Row>
                { products.map( product => {
                    return(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    )
                  })
                } 
            </Row>
        </>
    )
}

export default HomeScreen

//1.sm for small screen sizes,lg for large screen sizes,xl for extra large sizes 
