import React,{ useState } from 'react'
import FormContainer from '../components/FormContainer';

const ShippingScreen = () => {
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [city,setCity] = useState('');

    return (
        <FormContainer>
           <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='address' placeholder='Enter address' value={address} onChange={(e) => {setAddress(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                </Form.Group>
           </Form> 
        </FormContainer>
    )
}

export default ShippingScreen
