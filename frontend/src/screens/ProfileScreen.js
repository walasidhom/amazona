import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { detailsUser, updateUserProfile } from '../JS/Actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../JS/constants/userConstants';

const ProfileScreen = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        
    }, [dispatch, userInfo._id , user]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update profile
        if (password !== confirmedPassword) {
            toast.error('Passwords do not match !');
        } else {
            dispatch(updateUserProfile({
                userId: user._d,
                name,
                email,
                password
            }));
        }
    }
    
  return (
    <Container style={{ maxWidth: '500px' ,justifyContent:'center', alignItems:'center'}}>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <h1 className='my-3 text-center' style={{fontSize:'30px'}}>User Profile</h1>
        <Form className='signin-form' onSubmit={submitHandler}>
            
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label className='label'>Name</Form.Label>
                <Form.Control
                    value={name}
                    style={{minBlockSize:'30px'}}
                    onChange={(e) => setName(e.target.value)}
                    required/>
            </Form.Group>
              
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label className='label'>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    style={{minBlockSize:'30px'}}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label className='label'>Password</Form.Label>
                <Form.Control
                    type='password'
                    style={{minBlockSize:'30px'}}
                    onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label className='label'>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    style={{minBlockSize:'30px'}}
                    onChange={(e) => setConfirmedPassword(e.target.value)}/>
              </Form.Group>
              <div className='d-grid'>
                <Button className='primary' type='submit'>Update</Button>
                </div>
        </Form>
    </Container>
  )
}

export default ProfileScreen