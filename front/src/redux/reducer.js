import {
  GET_ALL_BOOKS,
  SORT_BY_PRICE,
  SORT_BY_RATING,
  GET_BOOKSPAGE,
  CHANGE_PAGINA,
  SEARCH_BY_NAME_OR_AUTHOR,
  SET_DETAIL,
  FILTER_BY_GENRE,
  FILTER_AUTHOR,
  POST_BOOK,
  CREATE_USER,
  FILTER_FLAG,
  RESET_FILTERS,
  GET_AUTORES,
  GET_GENEROS,
  GET_REVIEWS_BOOK,
  POST_REVIEW,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_REVIEWS_BY_USER,
  PUT_BOOK,
  PUT_REVIEW,
  DELETE_REVIEW,
  UPDATE_USER
} from './action';

// Initial state
const initialState = {
  //detail_data es en donde se guarda la data para renderizar en detail, tanto del searchbar como al clickear una portada. 
  detail_data: undefined,
  //slice del Allbooks con la pagina pedida
  booksPage: [],
  //Representa el número de página que se renderiza en Posters
  paginaActual: 1,
  //books sirve para renderizar los filtrados
  books: [],
  //array original de todos los libros
  allBooks: [],
  //Flag para saber si se esta filtrando
  filterFlag: false,
  //Array de géneros
  generos: [],
  //Array de autores
  autores: [],
  //array que trae todas la reseñas de un libro
  reviewsBook: [],
  //Objeto con los datos del usuario logueado
  user: null,
  //array que trae todas la reseñas de un usuario
  userReviews: [],
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        allBooks: action.payload
      };

    case CHANGE_PAGINA:
      return {
        ...state,
        paginaActual: action.payload
      };

    case GET_BOOKSPAGE:
      const pageSize = 9;
      const pageNumber = action.payload
      const indiceInicio = (pageNumber - 1) * pageSize;
      const indiceFinal = indiceInicio + pageSize;

      // console.log("pageNumber " + pageNumber)
      // console.log("indiceInicio " + indiceInicio)
      // console.log("indiceFinal " + indiceFinal)
      // console.log()

      return {
        ...state,
        booksPage: state.allBooks.slice(indiceInicio, indiceFinal)
      };

    case SORT_BY_PRICE:
      let arrayOrdenPrecio = state.filterFlag ? state.books : state.booksPage
      let sortPriceArray = action.payload === 'Asc' ? arrayOrdenPrecio.sort((a, b) => {
        return a.price - b.price
      }) :
        arrayOrdenPrecio.sort((a, b) => {
          return b.price - a.price
        });
      const returnPriceProp = state.filterFlag ? "books" : "booksPage"
      return {
        ...state,
        [returnPriceProp]: [...sortPriceArray]
      }

    //el case SORT_BY_RATING esta hecho en base al precio, ya que aun no hay reseñas
    case SORT_BY_RATING:
      let arrayOrdenadoRating = state.filterFlag ? state.books : state.booksPage
      let sortRatingArray = action.payload === 'Asc' ? arrayOrdenadoRating.sort((a, b) => {
        return a.price - b.price
      }) :
        arrayOrdenadoRating.sort((a, b) => {
          return b.price - a.price
        });
      const returnRatingProp = state.filterFlag ? "books" : "booksPage"
      return {
        ...state,
        [returnRatingProp]: [...sortRatingArray]
      }

    case SEARCH_BY_NAME_OR_AUTHOR:
      return {
        ...state,
        booksPage: action.payload,
        allBooks: action.payload,
      };

    case SET_DETAIL:
      return {
        ...state,
        detail_data: action.payload,
      };

    case FILTER_BY_GENRE:
      {
        const genreFiltered = action.payload === 'All' ?
          state.allBooks : state.books.filter(libro => {
            if (libro.genders.length > 0) {
              if (libro.genders.find(genero => genero === action.payload)) return libro
            }
          })
        return {
          ...state,
          books: genreFiltered
        }
      }

    case FILTER_AUTHOR: {
      const authorsFiltered = action.payload === 'All' ?
        state.allBooks : state.books.filter(libro => {
          if (libro.authors.length > 0) {
            if (libro.authors.find(autor => autor === action.payload)) return libro
          }
        })
      return {
        ...state,
        books: authorsFiltered
      }
    }

    case POST_BOOK:
      return { ...state }

    case CREATE_USER:
      return { ...state }

    case FILTER_FLAG:
      return {
        ...state,
        filterFlag: action.payload,
      }

    case RESET_FILTERS:
      return {
        ...state,
        books: state.allBooks
      }

    //no se guarda en los arrays autores y generos.
    case GET_GENEROS:
      //console.log("entra al reducer el get generos")
      const genresNoRepeat = state.books
        .flatMap(book => book.genders)
        .filter((genre, index, self) => self.findIndex(g => g === genre) === index);

      //console.log(genresNoRepeat)

      const sortGenres = genresNoRepeat.sort((a, b) => {
        if (a > b) { return 1 }
        if (b > a) { return -1 }
        return 0
      })
      return {
        ...state,
        generos: sortGenres
      }

    case GET_AUTORES:

      const authorsNoRepeat = state.books
        .flatMap(book => book.authors)
        .filter((aut, index, self) => self.findIndex(a => a === aut) === index);

      const sortAuthors = authorsNoRepeat.sort((a, b) => {
        if (a > b) { return 1 }
        if (b > a) { return -1 }
        return 0
      })
      return {
        ...state,
        autores: sortAuthors
      }

    //trae todas las reviewsde un libro
    case GET_REVIEWS_BOOK:
      return {
        ...state,
        reviewsBook: action.payload.reviews
      }

    case POST_REVIEW:
      return {
        ...state
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }

      case LOGOUT:
      return {
        ...state,
        user: null
      }
      
      case GET_REVIEWS_BY_USER:
        return {
          ...state,
          userReviews: action.payload.reviews
        }

      case PUT_BOOK:
      return {
        ...state
      }
      case PUT_REVIEW:
        //console.log('entra la action en el reducer')
        return {
          ...state
        }
      case DELETE_REVIEW:
        //console.log('entra la action en el reducer');
        return {
          ...state
        }
      case UPDATE_USER:
        return { ...state }

    default:
      return state;
  }

}

export default reducer;
