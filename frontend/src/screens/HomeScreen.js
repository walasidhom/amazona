import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { motion } from "framer-motion";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../JS/Actions/productActions';



const HomeScreen = () => {

const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
    
  return (
    
    <div>
      <motion.h1
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            whileHover={{ scale: 1.1 }}>
                Features Products
        </motion.h1>
          
        <motion.div
                initial={{ y: 2000 }}
                animate={{ y: 10 }}
                transition={{ type: "spring", duration: 1 }} className='products'>
        {
          loading ? <LoadingBox /> :
            error ? <MessageBox variant='danger'>{error}</MessageBox> :
              <Row>
                {products.map((product) => {
                  return (
                    <Col
                      sm={6} md={4} lg={3} className='mb-3' key={product._id}>
                      <Product product={product} />
                    </Col>
                    
                  )
              
                })}
              </Row>
          
            
          }
        </motion.div>
    </div>
  )
}

export default HomeScreen