import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../redux/action";
import axios from 'axios';
import { URL_Railway } from '../../../ruta';
import { decode } from 'jsonwebtoken-esm';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

export const Nav = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    const response = await axios.get(`${URL_Railway}/auth/logout`);
    localStorage.removeItem('token');
    dispatch(logout())
    navigate("/")
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Definir la clave de encriptación
      const clave = 'mi_clave_secreta';

      // Decodificar el token JWT
      const decodedToken = decode(token);

      if (decodedToken && decodedToken.objetoEncriptado) {
        // Obtener el objeto encriptado del token decodificado
        const objetoEncriptado = decodedToken.objetoEncriptado;

        // Desencriptar el objeto
        const bytesDesencriptados = AES.decrypt(objetoEncriptado, clave);
        const textoDesencriptado = bytesDesencriptados.toString(encUtf8);
        const objetoDesencriptado = JSON.parse(textoDesencriptado);

        dispatch(login(objetoDesencriptado.datos))
        navigate("/catalogo")
      }
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg px-2">
        <div className="container-fluid">
          <p className="navbar-brand ms-auto mb-2 mb-lg-0 fs-4 d-flex align-items-center pb-4">
            <Link to='/'>
              <img src="./images/logo.png" alt="Logo" width="100" height="100" className="d-inline-block" />
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
