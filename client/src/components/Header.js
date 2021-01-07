import React from 'react'
import {Navbar,Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../actions/userActions';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);

    const {userInfo} = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to = '/'>
                    <Navbar.Brand>MegaStore</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? 
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown> :
                            <LinkContainer to='/login'>
                                <Nav.Link ><i className='fas fa-user'></i>Sign In</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header

//1. for Navbar We have taken code from react-bootstrap docs & added variant,collapseOnSelect 
//2. for name & nav items to be in middle we have wraped the contents of Navbar in a <Component>
//3.for Nav items to be on right side we have changed classNmae of Nav to 'ml-auto'
//4.We can also wrap content inside 'LinkContainer' which works in same way as 'Link' does