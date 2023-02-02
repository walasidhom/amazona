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
              <Nav className='me-auto'>
                
                  
                <FontAwesomeIcon icon={faShoppingCart} className='icon' size='xl' />
                <Link to='/Cart' className="nav-link" title='Cart'>
                  
                  {cartItems.length > 0 && 
                    <Badge pill bg="danger" style={{ fontSize: 8 }}>
                      {cartItems.reduce( (a,c)=> a+c.qty, 0)}</Badge>
                  }
                </Link>
              </Nav>
              
                <SearchBox />
              
        
              <Nav>
                {userInfo ? (
            <NavDropdown style={{paddingRight:'30px'}} title={userInfo.name} id="basic-nav-dropdown" >
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
                                  
                </Nav>
            </Container>
            
          </Navbar>
  )
}

export default NavigationBar