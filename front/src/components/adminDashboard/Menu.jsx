import React from 'react';
import { Nav } from 'react-bootstrap';

const Menu = ({setCompoActivo}) => {

  const navHandler=(nombreCompo)=>{
    setCompoActivo(nombreCompo)
  }
  return (
    <Nav variant="pills" className="flex-column sidebar shadow">
      {/* <Nav.Item className="sidebar-item">
        <Nav.Link  href="#panel">Panel de control</Nav.Link>
      </Nav.Item> */}
      <Nav.Item className="sidebar-item">
        <Nav.Link  onClick={()=>navHandler("inventario")} href="#inventario">Inventario</Nav.Link>
      </Nav.Item>
      <Nav.Item  onClick={()=>navHandler("usuarios")} className="sidebar-item">
        <Nav.Link href="#usuarios">Usuarios</Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link  onClick={()=>navHandler("pedidos")} href="#pedidos">Pedidos</Nav.Link>
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