import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {putReview, getReviewsByUser} from '../../../redux/action';

 

const FormEditReviews = ({review, toggleModal, handleEditReview}) => {
    const dispatch = useDispatch();
    const [number, setNumber] = useState(review.qualification);
    const [hoverStar, setHoverStar] = useState(undefined);
    const [success, setSuccess] = useState(false); // estado local para manejar la alerta de ok
    const userId = useSelector((state) => state.user.id);
    const reviewId = review.id
    //console.log(review);
    
    const handlerText = () => {
      switch (number || hoverStar) {
        case 0:
          return 'Calificar';
        case 1:
          return 'Me defraudó';
        case 2:
          return 'No me gustó';
        case 3:
          return 'Neutral';
        case 4:
          return 'Bueno';
        case 5:
          return 'Maravilloso';
        default:
          return 'Calificar'
      }
    }
    const [input, setInput] = useState({
        id: review.id,
        title: review.title,
        qualification: number,
        comment: review.comment,
        deleted: false,
        //id_book: review.id_book,
        book: review.book,
    })

    const inputHandler = (e) => {
        setInput({
            ...input,
            id: review.id,
            qualification: number,
            deleted: false,
            //id_book: review.id_book,
            book: review.book,
            [e.target.name] : e.target.value
        });
    };

    // console.log(success)
    const submitHandler = async (e) => {
      e.preventDefault();
          await dispatch(putReview(reviewId, input));
          dispatch(getReviewsByUser(userId))
          setSuccess(true); // al setearse en true cambia el rederizado  
          setTimeout(function(){
            toggleModal()//una vez enviado se ciera el modal
              setSuccess(false)
          }, 2000)    
      }
//prueba para push

    return (
        <>
            <p className='text-center fs-5'>Estas editando tu reseña del libro:</p>
            <h6 className='text-center fs-3'>{input.book}</h6>
            <form onSubmit={submitHandler}>
                {success && <img className="w-50 p-3 h-50 d-inline-block" src='.\images\editedReview.png' alt='formulario enviado correctamente' />}
                {!success && (
                  <div>
                    <div className="row g-3 align-items-center">
                      <div className="d-flex flex-column align-items-center">
                        <p className="text-center">{handlerText()}</p>
                        <div>
                          {Array(5).fill().map((_, index) => {
                            return (
                              number >= index + 1 || hoverStar >= index + 1
                                ? <i className="bi bi-star-fill" onClick={() => setNumber(index + 1)} onMouseOver={() => setHoverStar(index + 1)} onMouseLeave={() => { setHoverStar(undefined) }} />
                                : <i className="bi bi-star" onClick={inputHandler} onMouseOver={() => setHoverStar(index + 1)} onMouseLeave={() => { setHoverStar(undefined) }} />
                            )
                          })}
                        </div>
                      </div>
                      <div className="col-auto">
                        <label className="col-form-label ms-3" htmlFor='title'>Título:</label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" id='title' type='text' value={input.title} name='title' placeholder='Dale un título a tu reseña' onChange={inputHandler} />
                      </div>
                    </div>        
                    <div className="row g-3 align-items-center">
                      <div className="col-auto">
                        <label className="col-form-label ms-3" htmlFor='comment'>Reseña:</label>
                      </div>
                      <div className="col-auto">
                        <input className="form-control" id='comment' type='textarea' value={input.comment} name='comment' placeholder='Reseña...' onChange={inputHandler} />
                        {/* {errors.comment ? <p className="text-danger">{errors.comment}</p> : null} */}
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex flex-row justify-content-evenly">
                <button className="btn btn-dark m-3"  type="submit" onClick={submitHandler}>Enviar</button>
                  <button className="btn btn-dark m-3" onClick={() => toggleModal()}>Cerrar</button>
                </div>
              </form>
          </>
    )
};

export default FormEditReviews
