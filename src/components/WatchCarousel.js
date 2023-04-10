import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div className="product-carousel">
      <h2 className="carousel-title text-center">Watch</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-blue">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <div className="video-container text-center">
                <iframe
                  width="780"
                  height="515"
                  src={product.watch}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  autoplay // add this attribute to enable autoplay
                ></iframe>
              </div>
          
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ProductCarousel;
