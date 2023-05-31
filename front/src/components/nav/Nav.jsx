import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/action";

export const Nav = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <p className="navbar-brand ms-auto mb-2 mb-lg-0 fs-4 d-flex align-items-center pb-4">
          <Link to='/'>
            <img src="./images/logo.png" alt="Logo" width="80" height="80" className="d-inline-block"/>
          </Link>
          </p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-fill" id="navbarNav">
                <Link to="/" className="nav-link fs-4 nav-link active" aria-current="page">Inicio</Link>
                <Link to="/nosotros" className="nav-link fs-4">Nosotros</Link>
                <Link to="/suscripcion" className="nav-link fs-4">Suscribirme</Link>
                <Link to="/catalogo" className="nav-link fs-4">Tienda</Link>

                {!user ? <Link to="/ingresar" className="nav-link fs-4">Ingresar</Link>
                : user.profile === "admin" ? <div className="row d-flex align-items-center text-center">
                                              <Link to="/admindashboard" className="nav-link fs-4">Administración</Link>
                                              <button onClick={handleClick} className="btn btn-outline-dark">Salir</button></div>
                : <div className="row d-flex align-items-center text-center">
                <Link to="/perfil" className="nav-link fs-4">Mi perfil</Link>
                <button onClick={handleClick} className="btn btn-outline-dark">Salir</button></div>}
          </div>
        </div>
      </nav>
    </>
  )
}
