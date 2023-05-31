import React from 'react';
import { Link } from 'react-router-dom';

export const Suscripcion = () => {
  return (
    <div>

      <h2 className='text-center fs-1'>¿Por qué debería suscribirme?</h2>
      <div className="card mb-3 mx-5 mt-3">
        <div className="row g-0">
          <div className="col-md-5">
            <img src="./images/susc.jpg" className="img-fluid rounded-start" alt="suscripcion" />
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div className="card-body">
              <h5 className="card-title text-center">Beneficios de formar parte de Rayuela</h5>
              <ul>
                <li>Vas a recibir en la comodidad de tu hogar el libro del mes</li>
                <li>Junto con el libro recibirás regalos extra como señaladores, stickers, guías de lectura y mucho más</li>
                <li>Podrás formar parte de la comunidad Rayuela en Slack y conectarte con otros lectores del club</li>
                <li>Serás invitado a charlas on-line con autores destacados</li>
                <li>¡Increíbles descuentos en la tienda!</li>
                <li>Suscribirse es ideal para las personas a las que les apasiona la literatura pero les cuesta decidir cuál será su próxima lectura</li>
              </ul>
              <p className="card-text text-center">¡No pierdas tiempo y suscribite para la próxima entrega!</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className='text-center fs-1'>¿Cómo me suscribo?</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 px-5 m-3">
        <div className="col">
          <div className="card h-100">
            <img src="./images/paso1.png" className="card-img-top" alt="Paso 1" />
            <div className="card-body text-center">
              <h5 className="card-title fs-4 fw-bold text-danger">Registrarse</h5>
              <p className="card-text">Completá tus datos <Link to="/registro">aquí</Link>. Sólo te tomará unos minutos</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title fs-4 fw-bold text-danger">Comprar</h5>
              <p className="card-text">La suscripción es mensual pero podés darte de baja en cualquier momento. Pagá de manera segura utilizando MecadoPago</p>
            </div>
            <img src="./images/paso2.png" className="card-img-top" alt="Paso 2" />
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="./images/paso3.png" className="card-img-top" alt="Paso 3" />
            <div className="card-body text-center">
              <h5 className="card-title fs-4 fw-bold text-danger">Leer y disfrutar</h5>
              <p className="card-text">Pronto va a llegar a tu domicilio el libro del mes y los obsequios extra que obtienen los miembros de Rayuela. Sumergite en el mundo de la literatura, disfrutando de los mejores títulos</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card text-center position-relative">
        <div className="card-header fs-3 fw-bold text-danger">
          Quiero suscribirme
        </div>
        <div className="card-body">
          <h5 className="card-title">Suscripción mensual $3500</h5>
          <a href="#" className="btn btn-secondary btn-lg m-3">Suscribirme</a>
          {/* <p className="card-text mb-5">Calcular costo de envío</p>
          <div className="input-group mb-3 w-25 text-center position-absolute bottom-0 start-50 translate-middle-x">
            <input type="text" className="form-control" placeholder="Código postal" />
            <button className="btn btn-secondary">Calcular</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
