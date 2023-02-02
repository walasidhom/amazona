import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../JS/Actions/cartActions'

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod);
  

  if (!shippingAddress.address) {
    navigate('/shipping');
  }
  
  const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodName));
        navigate('/placeorder');
    };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
              <h1 className='my-3 text-center' style={{fontSize:'30px'}}>Payment Method</h1>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button className='primary' type="submit">Continue</Button>
          </div>
        </Form>
              </div>
        
      </div>
    </div>
  )
}

export default PaymentMethodScreen