import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../JS/Actions/productActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from "@fortawesome/free-solid-svg-icons";



const ProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  
  return (
      <div>
      {loading ?
        <LoadingBox />
        :
        error ?
          <MessageBox variant='danger'>{error}</MessageBox>
          :
          <div>
            <Link to="/" title='Go back'><FontAwesomeIcon icon={faBackward} className='icon' size='xl'/></Link>
            <Row>
              <Col md={6}>
                <motion.div
                
                animate={{ x: [-1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2 }}>
                <img
                  src={product.image}
                  alt={product.name}
                    className='img-large' />
                  </motion.div>
              </Col>
              <Col md={3}>
                <motion.div
                
                animate={{ x: [1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2 }}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Helmet>
                      <title>{ product.name}</title>
                    </Helmet>
                    <h1>{ product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating rating={product.rating}
                    numReviews={product.numReviews} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description : {product.description}
                  </ListGroup.Item>
                  </ListGroup>
                  </motion.div>
              </Col>
              <Col ms={3}>
                <motion.div
                
                animate={{ x: [1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2.5 }}>
                <Card className='mt-4'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col style={{textAlign:"right" , fontWeight:'bold'}}>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status :</Col>
                        <Col style={{textAlign:"right"}}>
                          {product.countInStock > 0 ?
                            <Badge bg='success'>In Stock</Badge>
                            :
                            <Badge bg='danger'>Out of Stock</Badge>
                        }
                        </Col>
                      </Row>
                      </ListGroup.Item>
                    </ListGroup>
                    {product.countInStock > 0 && (
                      <>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <Row>
                          <Col>Qty :</Col>
                          <Col style={{textAlign:"right"}}>
                            <select
                              value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                  style={{margin:'2px'}}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </Col>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant='flush'>
                      
                        <ListGroup.Item>
                          <div className='d-grid'>
                            <Button className='primary' onClick={addToCartHandler}>
                              Add to Card
                            </Button>
                          </div>
                        </ListGroup.Item>
                      
                        </ListGroup>
                      </>
                      
                    )
                      
                    }
                    
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>
      }
    </div>
  )
}

export default ProductScreen