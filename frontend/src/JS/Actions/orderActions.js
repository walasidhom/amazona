import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
} from '../constants/orderConstants';
import { getError } from '../../components/utils';
import { toast } from 'react-toastify';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:getError(error)
    });

  }
};

export const detailsOrder = (orderId) => async (dispatch , getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers:{Authorization:`Bearer ${userInfo.token}`}
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:getError(error)
    });
    toast.error(getError(error));
  }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

    
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: getError(error)
    });
  }
  toast.error(getError(error));
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload: getError(error)
    });
    toast.error(getError(error));
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/summary', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_SUMMARY_FAIL,
      payload: getError(error)
    });
    toast.error(getError(error));
  }
};