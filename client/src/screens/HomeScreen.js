import React,{useEffect,useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {

    const [products,setProducts] = useState([])

    useEffect(() => {
        axios
            .get('/api/products')
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])
  
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
