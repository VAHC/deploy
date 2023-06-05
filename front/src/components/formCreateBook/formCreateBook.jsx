import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBook, getAllBooks } from "../../redux/action";
import validation from "./validation";


export const FormCreateBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books);
    const [file, setFile] = useState(null)

    const genresNoRepeat = books
        .flatMap((book) => book.genders)
        .filter(
            (genre, index, self) => self.findIndex((g) => g === genre) === index
        );

    const sortGenres = genresNoRepeat.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    });

    const authorsNoRepeat = books
        .flatMap((book) => book.authors)
        .filter(
            (aut, index, self) => self.findIndex((a) => a === aut) === index
        );

    const sortAuthors = authorsNoRepeat.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    });

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    const [input, setInput] = useState({
        //estado,local para menejar los inputs
        title: "",
        publisher: "",
        description: "",
        price: "",
        stock: "",
        publishedDate: "",
        authors: [],
        genders: [],
        image:false,
    });

    const [errors, setErrors] = useState({
        // estado local para manejar los errores
        title: "",
        publisher: "",
        description: "",
        price: "",
        stock: "",
        publishedDate: "",
        authors: "",
        genders: "",
        image:false,
    });

    const [formComplete, setFormComplete] = useState(false); //estodo local para manejar el boton del submit y el envio de datos
    const [success, setSuccess] = useState(false); // estado local para manejar la alerta de ok

    //handler que maneja el estado de los inputs
    const inputHandler = (e) => {
       if (e.target.name === "authors") {
            setInput({
                ...input,
                authors: [...input.authors, e.target.value], //traigo todo lo que esta en el array y le concateno el nuevo valor
            });
        } else if (e.target.name === "genders") {
            setInput({
                ...input,
                genders: [...input.genders, e.target.value], //traigo todo lo que esta en el array y le concateno el nuevo valor
            });
        }else if (e.target.name === "image") {
            setFile(e.target.files[0])
            setInput({
                ...input,
                image: true, //
            });
        }
         else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        }

        setErrors(
            validation({
                ...input,
                [e.target.name]: e.target.value,
            },file) );
    };

    //useEffect que escucha los estados locales input y errors para setear el estado FormComplete
    useEffect(() => {
        let values = Object.values(input);
        console.log(values);
        let notComplete = values.filter(
            (value) => value === "" || value.length === 0
        );
        //let error = Object.keys(errors);
        console.log(notComplete);

        if (!notComplete.length) setFormComplete(true);
    }, [input]);
    //     if(!notComplete.length && !error.length) setFormComplete(true)
    // }, [input, errors])

    //    //handler para borrar los paises seleccionados
    //         const deleteHandler = (id) => {
    //             setInput({
    //                 ...input,
    //                 countryId: input.countryId.filter(c => c !== id)
    //             })
    //         }
    //handler del submit ==> si fomrComplete es true despacha la action PostActivity, setea Success en true, setea input y errors al estado inicial
    const submitHandler = (e) => {
        e.preventDefault();
        if (formComplete) {
            const data = new FormData()
            data.append('title', input.title)
            data.append('publisher', input.publisher)
            data.append('description', input.description)
            data.append('price', input.price)
            data.append('stock', input.stock)
            data.append('publishedDate', input.publishedDate)
            data.append('authors', input.authors)
            data.append('genders', input.genders)
            data.append('image', file)

            dispatch(postBook(data));
            setSuccess(true); // al setearse en true cambia el rederizado
            setInput({
                title: "",
                publisher: "",
                description: "",
                price: "",
                stock: "",
                publishedDate: "",
                authors: [],
                genders: [],
            });
            setErrors({
                title: "",
                publisher: "",
                description: "",
                price: "",
                stock: "",
                publishedDate: "",
                authors: "",
                genders: "",
            });
            setTimeout(function () {
                navigate("/catalogo"); //una vez enviado el form me redirige a catalogo
            }, 2000);
        } else {
            alert("missing or incorrect data");
        }
    };
    return (
        <>
            <h4 className="text-center fs-3">Crea un libro</h4>
            <form
                onSubmit={submitHandler}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {success && (
                    <img
                        className="w-50 p-3 h-50 d-inline-block"
                        src="./images/libroCreado.jpg"
                        alt="formulario enviado correctamente"
                    />
                )}
                {!success && (
                    <div>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="title"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Título:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="title"
                                    type="text"
                                    value={input.title}
                                    name="title"
                                    placeholder="Título del libro"
                                    onChange={inputHandler}
                                />
                                {/* {errors.name ? <p className={styles.vDanger}>{errors.name}</p> : null} */}
                                {/* <p>{errors.title}</p> */}
                                {errors.title ? <p className="text-danger">{errors.title}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="publisher"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Editorial:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="publisher"
                                    type="text"
                                    value={input.publisher}
                                    name="publisher"
                                    placeholder="Editorial del libro"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.publisher}</p> */}
                                {errors.publisher ? <p className="text-danger">{errors.publisher}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="description"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Sinopsis:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="description"
                                    type="textarea"
                                    value={input.description}
                                    name="description"
                                    placeholder="Sinopsis del libro"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.description}</p> */}
                                {errors.description ? <p className="text-danger">{errors.description}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="price"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Precio:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="price"
                                    type="number"
                                    value={input.price}
                                    name="price"
                                    placeholder="$"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.price}</p> */}
                                {errors.price ? <p className="text-danger">{errors.price}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="stock"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Stock:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="stock"
                                    type="number"
                                    value={input.stock}
                                    name="stock"
                                    placeholder="Cantidad"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.stock}</p> */}
                                {errors.stock ? <p className="text-danger">{errors.stock}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="publishedDate"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Fecha de publicación:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="publishedDate"
                                    type="month"
                                    value={input.publishedDate}
                                    name="publishedDate"
                                    placeholder="mm/aaaa"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.publishedDate}</p> */}
                                {errors.publishedDate ? <p className="text-danger">{errors.publishedDate}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="image"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Portada:
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    id="image"
                                    type='file'
                                    accept='image/jpeg'
                                    name="image"
                                    onChange={inputHandler}
                                />
                                {/* <p>{errors.image}</p> */}
                                {errors.image ? <p className="text-danger">{errors.image}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="genders"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Género/s literario/s:
                                </label>
                            </div>
                            <div className="col-auto">
                                <select
                                    className="form-select"
                                    name="genders"
                                    id="genders"
                                    onChange={inputHandler}
                                >
                                    <option value="" readOnly hidden>
                                        Elegí uno o más...
                                    </option>
                                    {sortGenres &&
                                        sortGenres.map((genre, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={genre}
                                                >
                                                    {genre}
                                                </option>
                                            );
                                        })}
                                </select>
                                {/* <p>{errors.genders}</p> */}
                                {errors.genders ? <p className="text-danger">{errors.genders}</p> : null}
                            </div>
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label
                                    className="col-form-label ms-3"
                                    htmlFor="authors"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Autor/es:
                                </label>
                            </div>
                            <div className="col-auto">
                                <select
                                    className="form-select col-auto"
                                    name="authors"
                                    id="authors"
                                    onChange={inputHandler}
                                >
                                    <option value="" readOnly hidden>
                                        Elegí uno o más...
                                    </option>
                                    {sortAuthors &&
                                        sortAuthors.map((author, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={author}
                                                >
                                                    {author}
                                                </option>
                                            );
                                        })}
                                </select>
                                {/* <p>{errors.authors}</p> */}
                                {errors.authors ? <p className="text-danger">{errors.authors}</p> : null}
                            </div>
                        </div>
                    </div>
                )}
                <div className="d-flex flex-row justify-content-evenly">
                    <button
                        className="btn btn-dark m-3"
                        disabled={!formComplete}
                        type="submit"
                    >
                        Crear
                    </button>
                    {/* <button className="btn btn-dark m-3" onClick={() => navigate('/catalogo')}>Volver</button> */}
                </div>
            </form>
        </>
    );
};
