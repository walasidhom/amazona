import React, { useContext } from 'react'
import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function AdminRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
