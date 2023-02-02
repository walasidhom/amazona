import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import { createOrder } from '../JS/Actions/orderActions'
import { ORDER_CREATE_RESET } from '../JS/constants/orderConstants'

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod , cartItems } = cart;

    if (!cart.paymentMethod) {
        navigate('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  
    
    const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                <title>Preview Order</title>
                </Helmet>
                    <h1 className='my-3' style={{ fontSize: '30px' }}>Preview Order</h1>
                    <Row>
                        <Col md={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>Shipping</h3>
                              </ListGroup.Item>
                            <ListGroup.Item>
                                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {shippingAddress.address},
                                    {shippingAddress.city}, {shippingAddress.postalCode},
                                    {shippingAddress.country}
                                    </ListGroup.Item>
                                    </ListGroup>
                                <div style={{ textAlign: 'right' }}>
                                        <Link to="/shipping" title='edit'><FontAwesomeIcon icon={faPen} /></Link>
                                </div> 
                                </Card.Body>
                        </Card>  
                        <Card className="mb-3">
                            <Card.Body>
                            <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>Payment</h3>
                              </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Method:</strong> {paymentMethod}
                                    </ListGroup.Item>
                                </ListGroup>
                                <div style={{ textAlign: 'right' }}>
                                        <Link to="/payment" title='edit'><FontAwesomeIcon icon={faPen} /></Link>
                                </div> 
                            
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>Order Items</h3>
                              </ListGroup.Item>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="align-items-center">
                                    <Col md={5}>
                                        <img
                                        src={item.image}
                                        alt={item.name}
                                        className="small"
                                        ></img>{' '}
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        <span>{item.qty}</span>
                                    </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={3}><strong>total: </strong>${item.price * item.qty}</Col>
                                    </Row>
                                </ListGroup.Item>
                                ))}
                                </ListGroup>
                                <div style={{ textAlign: 'right' }}>
                                        <Link to="/cart" title='edit'><FontAwesomeIcon icon={faPen} /></Link>
                                </div>    
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>Order Summary</h3>
                              </ListGroup.Item>
                                
                                    <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col style={{textAlign:"right"}}>${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col style={{textAlign:"right"}}>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col style={{textAlign:"right"}}>${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <Row>
                                        <Col>
                                        <strong> Order Total</strong>
                                        </Col>
                                        <Col style={{textAlign:"right"}}>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                        className='primary'
                                        onClick={placeOrderHandler}
                                        disabled={cart.cartItems.length === 0}
                                        >
                                        Place Order
                                        </Button>
                                    </div>
                                    {loading && <LoadingBox></LoadingBox>}
                                    </ListGroup.Item>
                                </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                </Row>
            </div>
        </div>
  )
}

export default PlaceOrderScreen