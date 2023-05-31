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


    const renderConditional = () => {
        let renderElements = undefined

        if (filterFlag) {
            renderElements= filteredbooks.map((book, index) => {
                return <Card book={book} key={index} />;
            });
        } else {
            renderElements = booksPage.map((book, index) => {
                return <Card book={book} key={index} />;
            });
        }

        return renderElements
    };

    return renderConditional();
};
