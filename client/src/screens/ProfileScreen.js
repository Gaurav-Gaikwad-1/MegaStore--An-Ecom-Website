import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions'; 
import { Button,Form,Row,Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = ({history}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const {error,loading,user} = userDetails;

    //now we have to check if user is logged in if not we dont want to give acces to this page so we bring in userLogin state
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if(!userInfo)
            history.push('/login');
        else{
            if(!user.name)
                dispatch(getUserDetails('profile'))
            else{
                setName(user.name);
                setEmail(user.email);
            }
        }

    },[dispatch,history,userInfo,user]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch 
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            //Dispatch update profile
            dispatch(updateUserProfile({ id:user._id,name,email,password}));
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {message && <Message variant='danger'>{message}</Message> }
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={6}>
                <h2>My Orders</h2>
            </Col>    
        </Row>
    )
}

export default ProfileScreen;
