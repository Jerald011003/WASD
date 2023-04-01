import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded bg-dark text-white">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={'#f8e825'}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3" className="mb-3">
          ${product.price}
        </Card.Text>

        <Card.Text as="h5" className="mb-3">
  {product.countInStock === 0 ? "Out of Stock" : `Available`}
</Card.Text>


        <Link to={`/product/${product._id}`} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Product;
