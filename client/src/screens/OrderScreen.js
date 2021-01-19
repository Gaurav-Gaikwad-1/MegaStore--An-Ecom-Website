import React,{useEffect,useState} from 'react';
import { Col, Row,ListGroup,Image, Card, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder} from '../actions/orderActions';
import Axios from 'axios';
import {ORDER_PAY_RESET} from '../constants/orderConstants';

const OrderScreen = ({match}) => {
    const orderId = match.params.id;

    const [sdkReady,setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const {order,loading,error} = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;

    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult));
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const clientId = 'ARyRV71PMxASJ59WRqy5WBYLNbh7oKZW1wPFdWhkzIchIw7TNlvwEBE0VqEfHux4na7sBXaZQ_uWDufK'
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        //We should see order screen even order is not paid & we should also see it when it is paid with paid written 
        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true);
            }
        }
    },[dispatch,orderId,successPay,order])
   
    if(!loading){
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc+item.price * item.qty ,0);
    }
    return(
       loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :  
       <>
       <h1>Order {order._id}</h1>
       <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong>{order.user.name}</p>
                        <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address :</strong>
                            {order.shippingAddress.address}{','}{order.shippingAddress.city}{' '}{order.shippingAddress.postalCode}{','}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered? 
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>  :
                            <Message variant='danger'>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <p>
                            <h2>Payment Method </h2>
                            <strong>Method :</strong>{order.paymentMethod}
                        </p>
                        {order.isPaid ? 
                            <Message variant='success'>Paid on {order.paidAt}</Message>  :
                            <Message variant='danger'>Not Paid</Message>}
                            
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Your cart is Empty</Message> : 
                            (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} : ${(item.qty * item.price)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess= {successPaymentHandler}
                                        />
                                )}
                            </ListGroup.Item>
                        )}
        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
       </>
    )
}

export default OrderScreen;