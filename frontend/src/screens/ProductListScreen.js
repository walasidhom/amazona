import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [{ loading, error, products, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { search, pathname } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, [page, userInfo]);
    
    const deleteHandler = () => {
    /// TODO: dispatch delete action
  };

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <Button
                                
                                variant="success"
                                type="button"
                                size="sm"
                                onClick={() =>
                                    props.history.push(`/product/${product._id}/edit`)
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                type="button"
                                size="sm"
                                onClick={() => deleteHandler(product)}
                            >
                                Delete 
                            </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                {pages > 1 && [...Array(pages).keys()].map((x) => (
                    <Link
                        className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                        key={x + 1}
                            to={`/admin/products?page=${x + 1}`}
                        >
                        {x + 1}
                    </Link>
                ))}
          </div>
        </>
      )}
    </div>
  );
}