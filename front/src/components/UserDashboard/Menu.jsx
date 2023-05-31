import React from 'react';
import { Nav } from 'react-bootstrap';

const Menu = () => {
  return (
    <Nav variant="pills" className="flex-column sidebar shadow">
      <Nav.Item className="sidebar-item">
        <Nav.Link  href="#panel">Perfil</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#reseñas">Mis reseñas</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#suscripcion">Mi suscripción</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Menu;