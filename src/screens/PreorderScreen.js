import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPreorder, removeFromPreorder } from '../actions/preorderActions';
import { Row, Col, Image, ListGroup, Button, Card, Form, Container } from 'react-bootstrap';
// import { Card } from 'react-bootstrap'
import { listProductDetails, createProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const PreorderScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const preorder = useSelector(state => state.preorder);
    const { preorderItems } = preorder;

    useEffect(() => {
        if (productId) {
            dispatch(addToPreorder(productId, qty));

        }
    }, [dispatch, productId, qty]);

    const removeFromPreorderHandler = (id) => {
        dispatch(removeFromPreorder(id));
    };

 

  return (
    <Container>
     
      <h1>Pre-orders</h1>
      {preorderItems.length === 0 ? (
        <div className="text-center">
          <p>Your preorder list is empty</p>
          <Link to="/" className="btn btn-primary">
            Go Shopping
          </Link>
        </div>
      ) : (
        <Row>
          {preorderItems.map((item) => (
            <Col key={item.product} xs={12} md={6} lg={4} className="mb-5">
              <div className="p-3 border rounded">
              <Link to={`/product/${item.product}`} className="fw-bold">

                <Image style={{ width: '300px', height: '300px', objectFit: 'cover' }} src={item.image} alt={item.name} fluid />
                </Link>

                <div className="mt-3">
                  <Link to={`/product/${item.product}`} className="fw-bold">
                    {item.name}
                  </Link>
                </div>
                <h2></h2>
                <div className="mb-3">${item.price}</div>
                <div className="mb-3">Date of Available: {item.preorderdate}</div>
               
                        <Button
                  variant="danger"
                  onClick={() => removeFromPreorderHandler(item.product)}
                >
                  Remove
                </Button>
                </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
  
  
};

export default PreorderScreen;
