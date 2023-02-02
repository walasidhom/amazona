import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , Link, useNavigate} from 'react-router-dom';
import { register } from '../JS/Actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterScreen = () => {

  const [name, setName] = useState('second')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //to get the redirect value from url :
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  //check redirectInUrl, if it does exist set it in the redirectInUrl , else the default redirect is home screen 
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo , loading , error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match !');
    } else {
      dispatch(register(name ,email, password));
    }
    
    
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate ,redirect , userInfo])
  

  return (
    <Container style={{ maxWidth: '500px' ,justifyContent:'center', alignItems:'center'}}>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='my-3 text-center' style={{fontSize:'30px'}}>Sign Up</h1>
      {/* {loading && <LoadingBox />}
      {error && <MessageBox variant='danger'>{error}</MessageBox> } */}

      <Form className='signin-form' onSubmit={submitHandler}>
        
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label className='label'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter your name"
            required
            style={{minBlockSize:'30px'}}
            onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label className='label'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder="Enter your email"
            required
            style={{minBlockSize:'30px'}}
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label className='label'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder="Enter your password"
            required
            style={{minBlockSize:'30px'}}
            onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label className='label'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder="Enter your Confirm password"
            required
            style={{minBlockSize:'30px'}}
            onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Group>

        <div className='d-grid'>
          <Button className='primary' type='submit'>Sign Up</Button>
        </div>
        <div className='mb-3'>
          Already have an Account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  )
}

export default RegisterScreen