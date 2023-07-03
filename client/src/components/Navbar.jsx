import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/logo.png';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="p-0">
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="mx-2">
          <img src={logo} alt="logo" width="40" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/players">
              Players
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
