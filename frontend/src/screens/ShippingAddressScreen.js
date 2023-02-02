import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../JS/Actions/cartActions';
import { useNavigate } from 'react-router-dom';

export default function ShippingAddressScreen() {
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector((state) => state.cart);
    const { cartItems , shippingAddress } = cart;

    const navigate = useNavigate();
    //if user dosen't signin, redirect him to signin screen
    if (!userInfo){
        navigate('/signin');
    } else {
        if (!cartItems){
        toast.error('Your Cart is empty!');
        navigate('/Cart');
    }
    } 

    const [fullName, setFullName] = useState(shippingAddress.fullName || '' );
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode|| ''); 
    const [country, setCountry] = useState(shippingAddress.country|| '');
  
    
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(
            {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        ));
        navigate('/payment');
    };

  

    return (
        <>
        <CheckoutSteps step1 step2 />
        <Container style={{ maxWidth: '500px' ,justifyContent:'center', alignItems:'center'}}>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        
        <div >
            <h1 className='my-3 text-center' style={{fontSize:'30px'}}>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </Form.Group>
            

            <div className='d-grid'>
                <Button className="primary" type="submit">
                Continue
                </Button>
            </div>
            </Form>
        </div>
            </Container>
        </>
        
    );
}