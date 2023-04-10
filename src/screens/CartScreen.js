import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=details')
    }

    return (
        <Row>
            <Col md={20}>
                {/* <h1>Game:</h1> */}
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Choose your game <Link to='/'>Click Here</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col className='text-center'md={12}>
                                        <Link to={`/product/${item.product}`}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                            </Link>
                                        </Col>
                                        <Col md={10}>
                                           
                                        </Col>

                                      
                                        

                                       

                                        <Col md={5}>
    <Button
        type='button'
        variant='light'
        onClick={() => removeFromCartHandler(item.product)}
        style={{ backgroundColor: 'red', color: 'white' }}
    >
        Cancel
    </Button>
</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={20}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Cost</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item className='text-center'>
    <Button
        type='button'
        className='btn-block'
        disabled={cartItems.length === 0}
        onClick={checkoutHandler}
        style={{ fontSize: '25px', padding: '5px 100px' }}
    >
        Purchase now
    </Button>
</ListGroup.Item>

                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen