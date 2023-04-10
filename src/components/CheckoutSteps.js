import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Login</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/details'>
                        <Nav.Link>Details</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Details</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment Methods</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Payment Methods</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Purchase Game</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>Purchase Game</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
