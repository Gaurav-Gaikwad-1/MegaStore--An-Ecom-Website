import React,{ useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button,Form,Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({history}) => {
    
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const {shippingAddress} = cart;

    const [paymentmethod,setPaymentMethod] = useState('Paypal');
    
    if(!shippingAddress)
        history.push('/shipping');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentmethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h2>Payment Method</h2>
           <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check
                        type='radio'
                        label='Paypal or credit card'
                        id='Paypal'
                        name='paymentMethod'
                        value='Paypal'
                        checked
                        onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check> */}
                </Col>
                <Button type='submit' variant='primary' className='mt-4'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
