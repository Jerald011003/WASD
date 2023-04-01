import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { FaHome, FaGamepad, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { GiSwordsEmblem } from 'react-icons/gi';
import { SiTwitch } from 'react-icons/si';
import Avatar from '../assets/WASDLogo.png';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFileInvoice } from 'react-icons/fa';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { FaComments } from 'react-icons/fa';

function Header({ match, history}) {
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  // const addToPreorder = () => {
  //   history.push(`/preorder/${match.params.id}?qty=${qty}`);
  // };
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '125px' }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={Avatar} className="d-inline-block align-top" alt="WASD Logo" style={{ width: '75px', height: '75px' }} />{' '}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <FaHome className="me-2" />
                  Home
                </Nav.Link>
              </LinkContainer>
              <NavDropdown title={<span><FaShoppingCart className="me-2" />Purchases</span>}> 
  <LinkContainer to="/cart">
    <NavDropdown.Item>
      <FaShoppingCart className="me-2" />
      Purchases
    </NavDropdown.Item>
  </LinkContainer>           

  <LinkContainer to="/preorder">
 
  <NavDropdown.Item>
    <FaFileInvoice className="me-2" />
    Preorder
  </NavDropdown.Item>
</LinkContainer>

</NavDropdown>


              <LinkContainer to="/wishlist">
              <Nav.Link>
  <FontAwesomeIcon icon={faHeart} className="me-2" />
  Wishlist
</Nav.Link>



              </LinkContainer>

              
            </Nav>


            <Nav>
            <LinkContainer to="/chatbox">
                <Nav.Link>
                  <FaComments />Chat
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/stream">
                <Nav.Link>
                  <SiTwitch className="me-2" />
                  Stream
                </Nav.Link>
              </LinkContainer> */}
      
      {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <FaUser className="me-2" />
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to="/orderlist">
                    <NavDropdown.Item>
                      <GiSwordsEmblem className="me-2" />
                      List of Orders
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="me-2" />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              
{userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

