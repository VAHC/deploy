import axios from 'axios';
import  URL_Railway  from '../../ruta';

// Action types

export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const GET_BOOKSPAGE = 'GET_BOOKPAGE';
export const CHANGE_PAGINA = 'CHANGE_PAGINA';
export const SEARCH_BY_NAME_OR_AUTHOR = 'SEARCH_BY_NAME_OR_AUTHOR';
export const SET_DETAIL = "SET_DETAIL";
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_AUTHOR = 'FILTER_AUTHOR';
export const POST_BOOK = "POST_BOOK";
export const CREATE_USER = "CREATE_USER";
export const FILTER_FLAG = "FILTER_FLAG";
export const RESET_FILTERS = "FILTER_FLAG";
export const GET_GENEROS = "GET_GENEROS";
export const GET_AUTORES = "GET_AUTORES";
export const GET_REVIEWS_BOOK = 'GET_REVIEWS_BOOK';
export const POST_REVIEW = 'POST_REVIEW';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const GET_REVIEWS_BY_USER = "GET_REVIEWS_BY_USER";
export const PUT_BOOK = "PUT_BOOK";
export const PUT_REVIEW = "PUT_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_USER = "UPDATE_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const EMPTY_CART = "EMPTY_CART";

export const getAllBooks = () => {
  return async (dispatch) => {
    const response = await axios.get(`${URL_Railway}/books`);
    const allBooks = response.data;
    dispatch({ type: GET_ALL_BOOKS, payload: allBooks })
  }
}

//importa los libros de la pagina correspondiente
export const getBooksPage = (pagNum) => {
  return { type: GET_BOOKSPAGE, payload: pagNum }
}

//se encarga de actualizar pagina actual
export function changePagina(pagNum) {
  return {
    type: CHANGE_PAGINA, payload: pagNum
  }
}

export const sortByPrice = (payload) => {
  return {
    type: SORT_BY_PRICE, payload
  }
}

export const sortByRating = (payload) => {
  return { type: SORT_BY_RATING, payload }
}

export const searchByNameOrAuthor = (name) => {
  // return async (dispatch) => {
  //   const response = await axios.get(`http://localhost:3001/books?title=${name}`);
  //   const searchArray = response.data;
  //   dispatch({ type: SEARCH_BY_NAME_OR_AUTHOR, payload: searchArray })
  // }
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_Railway}/books?title=${name}`)
      return dispatch({
        type: SEARCH_BY_NAME_OR_AUTHOR,
        payload: response.data
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }
}

export const setDetail = (bookObj) => {
  return { type: SET_DETAIL, payload: bookObj }
}

export const genreFiltered = (arr) => {
  return { type: FILTER_BY_GENRE, payload: arr }
}

export const filterAuthor = (value) => {
  return { type: FILTER_AUTHOR, payload: value }
}

export const postBook = (book) => {
  return async function (dispatch) {
    let response = await axios.post(`${URL_Railway}/books`, book)
    return response
  }
}

export const createUser = (user) => {
  return async function (dispatch) {
    let response = await axios.post(`${URL_Railway}/auth/registro`, user)
    return response
  }
}

export const filterFlagToggle = (boolean) => {
  return {
    type: FILTER_FLAG,
    payload: boolean
  }
}

export const resetFilter = () => {
  return { type: RESET_FILTERS }
}

export const getGeneros = () => {
  return { type: GET_GENEROS }
}

export const getAutores = () => {
  return { type: GET_AUTORES }
}

//trae todas las reviews de un libro
export const getReviewsBook = (bookId) => {
  //console.log('action' + bookId);
  return async (dispatch) => {
    const response = await axios.get(`${URL_Railway}/books/${bookId}`);
    const allReviews = response.data;
    dispatch({ type: GET_REVIEWS_BOOK, payload: allReviews })
  }
}

export const postReview = (review) => {
  console.log(review);
  console.log('se despacha la action');
  return async function (dispatch) {
    let response = await axios.post(`${URL_Railway}/reviews`, review)
    return response
  }
}

export const login = (user) => {
  return { type: LOGIN_SUCCESS, payload: user }
}

// export const logout = () => {
//   return { type: LOGOUT }
// }

export const logout = (userlogout) => {
  return async (dispatch) => {
    //const response = await axios.get(`${URL_Railway}/auth/logout`);
    //const userlogout = response.data;
    dispatch({ type: LOGOUT, payload: userlogout })
  }
}

//trae todas las reviews de un usuario
export const getReviewsByUser = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`${URL_Railway}/users/${userId}`);
    const userReviews = response.data;
    dispatch({ type: GET_REVIEWS_BY_USER, payload: userReviews })
  }
}

export const modifyBook = (bookEdit) => {
  //console.log(bookEdit)
  return async function (dispatch) {
    await axios.put(`${URL_Railway}/books/putbook`, bookEdit)
    dispatch({ type: PUT_BOOK })
  }
}

export const putReview = (reviewId, review) => {
  return async function (dispatch) {
    let response = await axios.put(`${URL_Railway}/reviews/${reviewId}`, review)
    dispatch({ type: PUT_REVIEW })
    //console.log('la action toma el dispatch');
    return response
  }
}

export const deleteReview = (reviewId) => {
  return async function (dispatch) {
    let response = await axios.put(`${URL_Railway}/reviews/delete/${reviewId}`)
    dispatch({ type: DELETE_REVIEW })
    return response
  }
}

export const deleteBook = async (bookId, dispatch) => {
  console.log("esta es la action")
  await axios.put(`${URL_Railway}/books/delete/${bookId}`)
  dispatch({ type: DELETE_BOOK })}

export const updateUser = (user) => {
  return async function (dispatch) {
    await axios.put(`${URL_Railway}/users`, user)
    dispatch({ type: UPDATE_USER })
  }
}

export const addToCart = (book) => {
  return { type: ADD_TO_CART, payload: book }
}

export const removeFromCart = (book) => {
  return { type: REMOVE_FROM_CART, payload: book }
}

export const removeItems = (id) => {
  return { type: REMOVE_ITEMS, payload: id }
}

export const emptyCart = () => {
  return { type: EMPTY_CART }
}