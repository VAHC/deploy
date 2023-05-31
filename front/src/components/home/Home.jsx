import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div className="container p-3 w-100">
        <div className="row justify-content-center">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="./images/01.png" className="d-block w-100 img-fluid" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-light bg-opacity-25 text-dark rounded">
                    <h5 className='fs-3 fw-bold'>Bienvenidos a Rayuela</h5>
                    <p className='fs-5 fw-bold px-5'>¡Es el momento de disfrutar de la lectura!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="./images/02.png" className="d-block w-100 img-fluid" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-light bg-opacity-25 text-dark rounded">
                    <h5 className='fs-3 fw-bold'>¿Qué es Rayuela?</h5>
                    <p className='fs-5 fw-bold px-5'>Rayuela es una suscripción literaria que te va a sorprender mes a mes con un libro que te va a encantar</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="./images/03.png" className="d-block w-100 img-fluid" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-light bg-opacity-25 text-dark rounded">
                    <h5 className='fs-3 fw-bold'>Comunidad</h5>
                    <p className='fs-5 fw-bold px-5'>En el sitio podés reseñar tus libros preferidos y conectarte con otros lectores que comparten tu misma pasión</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
        </div>
      </div>
      <div className='container p-3'>
        <div className="row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5 className="card-title fs-4 fw-bold text-secondary">Club de lectores</h5>
                <p className="card-text">Si querés sorprenderte todos los meses con nuevas propuestas, renovar tus ganas de leer con una experiencia única y dejar de preocuparte por elegir tu próxima lectura ¡Rayuela es para vos!</p>
                <div className="position-relative">
                  <img src="./images/05.jpg" className="d-block w-100" alt="..." />
                  <Link to="/suscripcion"><button className="btn btn-dark btn-lg position-absolute bottom-0 start-50 translate-middle m-2">Suscribite</button></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5 className="card-title fs-4 fw-bold text-secondary">Tienda</h5>
                <p className="card-text">Encontrá una selección de libros clásicos y modernos, con opiniones de otros lectores, para que elijas tu favorito y lo recibas en tu casa. ¡Empezá ahora!</p>
                <div className="position-relative">
                  <img src="./images/04.jpg" className="d-block w-100" alt="..." />
                  <Link to="/catalogo"><button className="btn btn-dark btn-lg position-absolute bottom-0 start-50 translate-middle m-2">Catálogo</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}