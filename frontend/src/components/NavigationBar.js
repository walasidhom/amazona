import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { signout } from '../JS/Actions/userActions'
import { useState } from 'react';
import SearchBox from './SearchBox';

const NavigationBar = (props) => {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
  };
  

    
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Button
          variant='dark'
          onClick={() => props.setSidebarIsOpen(!props.sidebarIsOpen)}>
          <i className='fa fa-bars' style={{fontSize : '20px'}}></i>
        </Button>
              <LinkContainer to='/'>
                <Navbar.Brand>
                  <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    style=
                    {{
                      width: '90px',
                      height: '30px',
                      marginTop: '10px'
                    }}
                    alt='amazona'/>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-center"><SearchBox /></Nav>
          <Nav className="me-auto  w-100  justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger" style={{fontSize:'rem'}}>
                    {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Link>
          
            {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                      <LinkContainer to="/profile" style={{fontSize:'1rem'}}>
                        <NavDropdown.Item >User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory" style={{fontSize:'1rem'}}>
                        <NavDropdown.Item >Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                        style={{fontSize:'1rem'}}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin" >
                      Sign In
                    </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown  title='Admin' id='admin-nav-dropdown' >
                <LinkContainer to='/admin/dashboard' style={{fontSize:'1rem'}}>
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products" style={{fontSize:'1rem'}}>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderList' style={{fontSize:'1rem'}}>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/userList' style={{fontSize:'1rem'}}>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            
            )}
                                  
          </Nav>
          </Navbar.Collapse>
            </Container>
            
          </Navbar>
  )
}

export default NavigationBar