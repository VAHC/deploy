import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooksPage, getAllBooks } from "../../redux/action";

import Card from "./Card";

export const Posters = () => {
    //Pagina actual
    const pagina = useSelector((state) => state.paginaActual);
    //libros de la pagina array
    const booksPage = useSelector((state) => state.booksPage);

    //array de libros filtrados
    const filteredbooks = useSelector((state) => state.books);

    //flag para saber si esta activo algun filtro
    const filterFlag = useSelector((state) => state.filterFlag);

    //flag para no cargar todos los libros con cada render
    const [allBooksLoaded, setAllBooksLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const booksGet = async () => {
            if (!allBooksLoaded) {
                await dispatch(getAllBooks());
                setAllBooksLoaded(true);
            }
            dispatch(getBooksPage(pagina));
        };
        booksGet();
    }, [pagina]);

//para que funcione bien el searchbar, crearia un "searchdata" en redux. al hacer la search despacharia esa accion y setearia/popularia ese array "searchdata". luego con un settime out o con un await despacharia el getpage que ahora recibiria dos parametros uno con la pagina y el otro con un booleano "esporbusqieda?", entonces se paginaria la busqueda. precisariamos un boton para resetear busqueda o ir para atras a todos los productos...

    const renderConditional = () => {
        let renderElements = undefined

        if (filterFlag) {
            renderElements= filteredbooks.map((book, index) => {
                // if(book.deleted === true) return null;
                return <Card book={book} key={index} />;
            });
        } else {
            renderElements = booksPage.map((book, index) => {
                // if(book.deleted === true) return null;
                return <Card book={book} key={index} />;
            });
        }

        return renderElements
    };

    return renderConditional();
};
