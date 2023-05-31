// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Accordion } from 'react-bootstrap';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviewsBook } from '../../redux/action';
import FormCreateReview from './FormCreateReview';


const ContainerReviews = ({ bookId, toggleModal }) => {
  //console.log('review' + bookId);
  const reviewsBook = useSelector((state) => state.reviewsBook);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state)  => state.user) //estado que comprueba que se esta logueado

  const notDeletedReviews = reviewsBook.filter(review => !review.deleted)

  useEffect(() => {
    dispatch(getReviewsBook(bookId));
  }, [bookId]);

  // const notLogin = () => {
  //     alert('Antes de dejar tu reseña debés loguearte')
  //     setTimeout(function(){
  //         navigate('/ingresar')//si no estoy logueado redirege al login
  //     }, 2000) 
  // }
  
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Modal show={true} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Reseñas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!notDeletedReviews.length ? (
          <div>
            <h6>Aún no hay reseñas...</h6>
            <h5>Sé el primero en dejar una!</h5>
          </div>
        ) : (
          notDeletedReviews.map((r) => (
            <Review
              id={r.id}
              title={r.title}
              qualification={r.qualification}
              comment={r.comment}
              user={r.user}
              key={r.id}
            />
          ))
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cerrar
        </Button>
        {/* <Button variant="primary">Deja tu reseña</Button> */}
        <div className="d-flex justify-content-center align-items-center">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Deja tu reseña</Accordion.Header>
            <Accordion.Body>
              {/* {!user ? notLogin() :  */}
              <FormCreateReview handleToggleForm={handleToggleForm} bookId={bookId} toggleModal={toggleModal}/>
            {/* } */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ContainerReviews