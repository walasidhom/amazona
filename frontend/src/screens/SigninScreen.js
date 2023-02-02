import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , Link, useNavigate} from 'react-router-dom';
import { signin } from '../JS/Actions/userActions';

const SigninScreen = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //to get the redirect value from url :
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  //check redirectInUrl, if it does exist set it in the redirectInUrl , else the default redirect is home screen 
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container style={{ maxWidth: '500px' ,justifyContent:'center', alignItems:'center'}}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3 text-center' style={{fontSize:'30px'}}>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password'
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className='d-grid'>
          <Button className='primary' type='submit'>Sign In</Button>
        </div>
        <div className='mb-3'>
          New customer?{' '}
          <Link to={`/register?redirect=${redirect}`}>
            Create your account
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SigninScreen