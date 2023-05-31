import React from 'react';
import { Nav } from 'react-bootstrap';

const Menu = () => {
  return (
    <Nav variant="pills" className="flex-column sidebar shadow">
      {/* <Nav.Item className="sidebar-item">
        <Nav.Link  href="#panel">Panel de control</Nav.Link>
      </Nav.Item> */}
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#inventario">Inventario</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#usuarios">Usuarios</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#clientes">Pedidos</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item className="sidebar-item">
        <Nav.Link href="#estadisticas">Estadísticas</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="#configuracion">Configuración</Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default Menu;