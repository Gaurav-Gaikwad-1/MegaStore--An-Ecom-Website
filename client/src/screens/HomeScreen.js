import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)                 //here we r taking productList from our global state defined by our redux store

    const { loading,error,products } = productList                           //extracting 3 properties from productlist state

    useEffect(() => {
        dispatch(listProducts())                                             //call to listProducts action which fills productList
    },[dispatch])


  
    return (
        <>
            <h1>Latests Products</h1>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
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
            )
            }
        </>  
    )
}

export default HomeScreen

//1.sm for small screen sizes,lg for large screen sizes,xl for extra large sizes 
