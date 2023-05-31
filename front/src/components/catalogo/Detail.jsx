import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ContainerReviews from "../reviews/ContainerReviews";
import { useState } from 'react';


export const Detail = () => {
  const detailData = useSelector((state) => state.detail_data);
  //console.log(detailData);
  const bookId = detailData ? detailData.id : null;
  //console.log('detail' + bookId)
  const qualificationObtained = (detailData) => {
    if (detailData.reviews && Array.isArray(detailData.reviews) && detailData.reviews.length > 0) {
      let sum = 0;
      for (let i = 0; i < detailData.reviews.length; i++) {
        sum += detailData.reviews[i].qualification;
      }
      let average = sum / detailData.reviews.length;
      return Math.round(average);
    }
    return 0; // Valor predeterminado si no hay reviews o no es un array válido
  };


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? <i key={i} className="bi bi-star-fill bi-sm" /> : <i key={i} className="bi bi-star bi-sm"/>;
      stars.push(starIcon);
    }
    return stars;
  };

  //codigo para modal
  const [showModal, setShowModal] = useState(false); //estdo local para mostrar o no el modal

  const toggleModal = () => { //funcion que setea showModal al booleano contrario en el que esta
    setShowModal(prevShowModal => !prevShowModal);
  };

  if (!detailData) {
    return (
      <Card style={{ width: "100%", height: "100%"}}>
        <Card.Body className="d-flex flex-column justify-content-evenly">
     <h1>Selecciona un libro para ver más detalles.</h1>
        </Card.Body>
    </Card>
    )}
    else{
        return (
            <Card style={{ width: "90%", height: "100%" }}>
                <Card.Body className="d-flex flex-column justify-content-evenly">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h4 style={{ marginRight: "10px", maxWidth: "70%" }}>
                            {detailData.title}
                        </h4>
                        <Button 
                            variant="secondary"
                            onClick={toggleModal}
                            //onClick={() => navigate(`/reseñas/${bookId}`)}
                        >
                            <p className="mb-1">Reseñas</p>
                            <div>{renderStars(qualificationObtained(detailData))}</div>
                        </Button>
                    </div>
                    <Row>
                        <Col>
                            <Card.Subtitle className="text-muted">
                                Autor
                            </Card.Subtitle>
                            {detailData.authors.map((author, index) => {
                                return <Card.Text key={index}>{author}</Card.Text>;
                            })}
                        </Col>
                        <Col>
                            <Card.Subtitle className="text-muted">
                                Género
                            </Card.Subtitle>
                            {detailData.genders.map((gender, index) => {
                                return <Card.Text key={index}>{gender}</Card.Text>;
                            })}
                        </Col>
                    </Row>

              <Card.Text style={{ overflow: "auto", height: "200px" }}>
                {detailData.description}
              </Card.Text>

              <div>
                <Row className="d-flex justify-content-center">
                  <Col className="text-center">
                    <Button variant="dark">Agregar al carrito</Button>
                  </Col>
                  {/* <Col>
                    <Button variant="outline-secondary">
                      Agregar a la Wishlist
                    </Button>
                  </Col> */}
                </Row>
              </div>
            </Card.Body>
            {showModal && (
              <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <ContainerReviews 
                      toggleModal={toggleModal}
                      bookId={bookId} // Corrección: pasando bookId como propiedad
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
    );
  }
};
