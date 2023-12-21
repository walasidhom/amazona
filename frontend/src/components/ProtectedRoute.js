import React, { useContext } from 'react'
import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo ? children : <Navigate to="/signin" />;
}
