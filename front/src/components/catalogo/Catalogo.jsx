import React, { useEffect } from "react";

//Componentes
import { Detail } from "./Detail";
import { SearchBar } from "./SearchBar";
import { Orders } from "./Orders";
import { Filters } from "./Filters";
import { Posters } from "./Posters";
import { Paginado } from "./Paginado";

//Estilos
import {
    Container,
    Sidebar,
    CatalogoSection,
    SearchBarDiv,
    DetailSection,
    PosterSection,
    Wrap,
} from "./Styles/catalogo";

import { getAllBooks } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

// En este componente se renderizan todos los demas.
export const Catalogo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBooks());
        //console.log("se hace el dispatch para buscar allBooks");
    }, []);

    const detailData = useSelector((state) => state.detailData);

    return (
        <Wrap>
            {/* ¿NavBar? */}
            <SearchBarDiv>
            <SearchBar />
            </SearchBarDiv>

            <Container>
                <Sidebar>
                    <Orders />
                    <Filters />
                </Sidebar>

                <CatalogoSection>
                    
                    <PosterSection>
                        <Posters />
                    </PosterSection>
                </CatalogoSection>

                {detailData === undefined && (
                    <DetailSection>
                        <Detail />
                    </DetailSection>
                )}
            </Container>
        </Wrap>
    );
};
