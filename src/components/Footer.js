import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Container className="py-3">
        <Row>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Connect With Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="me-3 text-white">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-white">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>About Us</h5>
            <p className="mb-0">
              WASD is a 4 keys gamesite, we can turn you into player.
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Contact Us</h5>
            <p className="mb-0">
              Email: contact@wasd.com <br />
              Phone: 555-555-5555 <br />
              Address: 123 Gaming Street, City, State Zip
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} W.A.S.D. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
