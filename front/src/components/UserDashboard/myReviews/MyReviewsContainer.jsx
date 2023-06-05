import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getReviewsByUser, deleteReview } from './../../../redux/action';
import FormEditReviews from "./FormEditReviews";
import {
    Container,
    Row,
    Col,
    Button,
    Table,
} from "react-bootstrap";

const MyReviewsContainer = () => {
    const userReviews = useSelector((state) => state.userReviews);
    const userId = useSelector((state) => state.user.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [showModal, setShowModal] = useState(false); //estdo local para mostrar o no el modal
    const [selectedReview, setSelectedReview] = useState(null);
    // //user hardcodeado para trabajar
    //const userId = 1;
    const dispatch = useDispatch();
    //prueba pr
    const notDeletedReviews = userReviews.filter((review) => !review.deleted)
    //console.log(notDeletedReviews);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          const starIcon = i <= rating ? <i key={i} className="bi bi-star-fill" /> : <i key={i} className="bi bi-star"/>;
          stars.push(starIcon);
        }
        return stars;
      };

    useEffect(() => {
        dispatch(getReviewsByUser(userId))
    }, [userId]);

  const toggleModal = () => { //funcion que setea showModal al booleano contrario en el que esta
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    toggleModal();
  };

  const handlerDelete = async (reviewId) => {
    setShowDeleteModal(true)
    await dispatch(deleteReview(reviewId))
    dispatch(getReviewsByUser(userId))
    setTimeout(() => {
        setShowDeleteModal(false)
    }, 3000);
  }

    return (
        <Container className="min-vh-100">
            <Row>
                <Col>
                    <h1>Mis reseñas</h1>
                </Col>
            </Row>

            {!notDeletedReviews.length ? (
                <div>
                    <h6>Aún no dejaste una reseña...</h6>
                    <h5>¡Elegí un libro y dejá una!</h5>
                </div>
            ) : (
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Libro</th>
                                    <th>Título</th>
                                    <th>Calificación</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notDeletedReviews.map((r, index) => (
                                    <tr id={r.id} key={index}>
                                        <td>{r.book}</td>
                                        <td>{r.title}</td>
                                        <td>{renderStars(r.qualification)}</td>
                                        <td>{r.comment}</td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <Button variant="primary" className="btn btn-sm me-2" onClick={() => handleEditReview(r)}>Editar</Button>
                                            <Button variant="danger" size="sm" onClick={() => handlerDelete(r.id)}><i className="bi bi-trash3" /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}

            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " style={{ marginTop: "7%" }}>
                        <div className="modal-content bg-white border-4">
                            <FormEditReviews
                                review={selectedReview}
                                toggleModal={toggleModal}
                            />
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "7%" }}>
                        <div className="modal-content bg-white border-4">
                            <div className="modal-body d-flex justify-content-center align-items-center">
                                <img className="w-50 p-3 h-50 d-inline-block" src='.\images\deleteReview.png' alt='reseña borrada' /> {/* Reemplaza "ruta-de-la-imagen.jpg" con la ruta de tu imagen */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default MyReviewsContainer