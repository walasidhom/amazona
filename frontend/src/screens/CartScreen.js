import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../JS/Actions/cartActions';

const CartScreen = () => {
const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
      <div>
          <Helmet>
              <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>
          <Row>
              <Col md={8}>
                  {cartItems.length === 0 ?
                      (<MessageBox>
                          Cart is empty{'  '}
                          <Link to='/'>Go shopping</Link>
                      </MessageBox>)
                      :
                      (
                          <ListGroup>
                              {cartItems.map((item) => (
                                    
                                  <ListGroup.Item key={item.product}>
                                      <Row className='align-items-center'>
                                          <Col md={4}>
                                            
                                              <img src={item.image}
                                                alt={item.name}
                                                  className='small'></img>{' '}
                                              <div className="min-30">
                                                  <Link to={`/product/${item.product}`}>
                                                      {item.name}
                                                  </Link>
                                              </div>
                                              
                                          </Col>
                                          <Col md={3}>
                                            <select
                                                value={item.qty}
                                                onChange={(e) =>
                                                      dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                    ))}
                                                  
                                            </select>
                                          </Col>
                                          <Col md={3}>${item.price}</Col>
                                          <Col md={2}>
                                              <Button variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}>
                                                  <i className='fa fa-trash'></i>
                                              </Button>
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>
                              ))}
                          </ListGroup>
                      )
                      }
              </Col>
              <Col md={4}>
                  <Card>
                      <Card.Body>
                          <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>
                                      Total ({cartItems.reduce( (a,c) => a+c.qty , 0)} products) : ${cartItems.reduce( (a,c) => a+c.price * c.qty , 0)}
                                  </h3>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <div className='d-grid'>
                                      <Button
                                          className='primary'
                                          disabled={cartItems.length === 0}
                                      onClick={checkoutHandler}>
                                          Proceed to Checkout
                                    </Button>
                                </div>
                              </ListGroup.Item>
                          </ListGroup>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    </div>
  )
}

export default CartScreen