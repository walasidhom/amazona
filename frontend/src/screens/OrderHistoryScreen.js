import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { listOrderMine } from '../JS/Actions/orderActions';


const OrderHistoryScreen = () => {
    
    const navigate = useNavigate();
    
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);


  return (
    <div className="container small-container">
                    <Helmet>
                    <title>Order History</title>
                    </Helmet>
          <h1 className='my-3' style={{ fontSize: '30px' }}>Order History</h1>
          {loading ?
              <LoadingBox />
              : error ? 
                  <MessageBox>{error}</MessageBox>
                  : (
                      <table className='table'>
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>DATE</th>
                                  <th>TOTAL</th>
                                  <th>PAID</th>
                                  <th>DELIVERED</th>
                                  <th>ACTIONS</th>
                              </tr>
                          </thead>
                          <tbody>
                              {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : 'No'}
                                    </td>
                                    <td>
                                    <Button
                                        type="button"
                                        variant='light'
                                        onClick={() => {
                                        navigate(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                    </td>
                                </tr>
                                ))}
                          </tbody>
                      </table>
                )}
          </div>
  )
}

export default OrderHistoryScreen