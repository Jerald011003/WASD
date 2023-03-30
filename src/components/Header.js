import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { FaHome, FaGamepad, FaShoppingCart, FaUser } from 'react-icons/fa';
import { GiSwordsEmblem } from 'react-icons/gi';
import { SiTwitch } from 'react-icons/si';
import Avatar from '../assets/WASDLogo.png';

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

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
             
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart className="me-2" />
                  Purchases
                </Nav.Link>
              </LinkContainer>
            </Nav>


            <Nav>
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
