import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../actions/wishActions';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const WishScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.wishlist);
    const { wishlistItems } = wishlist;

    useEffect(() => {
        if (productId) {
            dispatch(addToWishlist(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
    };

    return (
        <Container>
            <h1>Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <div className="text-center">
                    <p>Your wishlist is empty</p>
                    <Link to='/' className="btn btn-primary">Go Shopping</Link>
                </div>
            ) : (
                <Row>
                    {wishlistItems.map(item => (
                        <Col key={item.product} xs={12} md={6} lg={4} className="mb-4">
                            <div className="p-3 border rounded">
                                <Image style={{ width: '300px', height: '300px', objectFit: 'cover' }} src={item.image} alt={item.name} fluid />
                                <div className="mt-3">
                                    <Link to={`/product/${item.product}`} className="fw-bold">{item.name}</Link>
                                </div>
                                <div className="mb-3">${item.price}</div>
                                <Button variant="danger" onClick={() => removeFromWishlistHandler(item.product)}>Remove</Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default WishScreen;
