import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import { Link } from 'react-router-dom';
import WatchCarousel from '../components/WatchCarousel'
import '../styles/Header.css'
function HomeScreen({ history }) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div className="home-screen-container">
      {/* <Friend /> */}
   
      {/* <h1 className="home-screen-title">Latest Games</h1> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="home-screen-product-list-container">
          <Row className="home-screen-product-list">
            {products.map(product => (
              
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="home-screen-product-col" >
                <Product product={product} />
              </Col>
          
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} className="home-screen-pagination" />
         
        </div>
      )}
      {!keyword && <ProductCarousel />}


{/* <WatchCarousel /> */}
    </div>
  )
}

export default HomeScreen
