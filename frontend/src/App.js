import './App.css';
import {  Container, Nav} from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavigationBar from './components/NavigationBar';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from './JS/Actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './screens/DashboardScreen';
import DashboardScreen from './screens/DashboardScreen';
function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {loading: loadingCategories,error: errorCategories,categories,} = productCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
  }, [])
  
  
  return (
    <BrowserRouter>
      <div className={sidebarIsOpen
        ?
        'site-container d-flex flex-column active-cont'
        :
        'site-container d-flex flex-column'
      }>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <NavigationBar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <>
                {categories.map((c) => (
                <li key={c}>
                  <Link
                      to={`/search?category=${c}&query=&price=&rating=&order=`}
                      onClick={ ()=>setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))}
              </>)}
          </Nav>
        </div>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} /> 
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/cart/:id" element={<CartScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
              <Route path="/orderhistory" element={<ProtectedRoute ><OrderHistoryScreen /></ProtectedRoute>} />
              <Route path="/profile" element={
                <ProtectedRoute >
                  <ProfileScreen/>
                </ProtectedRoute>}
              />
              <Route path="/search" element={<SearchScreen />} />
              {/* Admin Route */}
              <Route path='/admin/dashboard' element={ <AdminRoute><DashboardScreen /></AdminRoute>} />
              
            </Routes>
          </Container>
          
          
        </main>
        <footer>
          <div className='text-center'>@All rights reserved</div>
        </footer>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
