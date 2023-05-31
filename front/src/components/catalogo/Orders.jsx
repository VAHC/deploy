import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {sortByPrice, sortByRating, changePagina} from '../../redux/action'

export const Orders = () => {
  const dispatch = useDispatch();
  const[priceValue, setPriceValue] = useState('');
  const[ratingValue, setRatingValue] = useState('');
  const filterFlag = useSelector(state=>state.filterFlag)
  
  useEffect(()=>{
    setRatingValue("")
    setPriceValue("")
  },[filterFlag])

  const handlerSortByPrice = (e) => {
    dispatch(sortByPrice(e.target.value))
    // dispatch(changePagina(1))
    setPriceValue(e.target.value)
    setRatingValue("")
  }

  const handlerSortByRating = (e) => {
    dispatch(sortByRating(e.target.value))
    // dispatch(changePagina(1))
    setRatingValue(e.target.value)
    setPriceValue("")
  }
  
  return (
    <div style={{ marginTop: "15px" }}>
      <h6 className='mx-2'>Ordena por</h6>
        <div className='m-1 mb-3'>
          {/* <label htmlFor='priceOrder'>Precio:</label> */}
          <select className='form-select' name='priceOrder' value={priceValue} onChange={handlerSortByPrice}>
            {/* <option value="" readOnly hidden>Elije una opcion...</option> */}
            <option value="" readOnly hidden>Precio</option>
            <option value="Asc">Menor precio</option>
            <option value="Desc">Mayor precio</option>
          </select>
        </div>
        <div className='m-1'>
          {/* <label htmlFor='ratingOrder'>Valoracion:</label> */}
          <select className='form-select' name='ratingOrder' value={ratingValue} onChange={handlerSortByRating}>
            {/* <option value="" readOnly hidden>Elije una opcion...</option> */}
            <option value="" readOnly hidden>Valoración</option>
            <option value="Asc">Valoración más baja</option>
            <option value="Desc">Valoración más alta</option>
          </select>
        </div>
      </div>
  )
}
