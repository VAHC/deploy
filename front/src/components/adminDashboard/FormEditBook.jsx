import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyBook } from "../../redux/action";

const EditBookForm = ({ book }) => {
    const [formComplete, setFormComplete] = useState(false); //estodo local para manejar el boton del submit y el envio de datos
    const [success, setSuccess] = useState(false); // estado local para manejar la alerta de ok

    const [input, setInput] = useState({
        id: book.id,
        title: book.title,
        publisher: book.publisher,
        description: book.description,
        price: book.price,
        stock: book.stock,
        publishedDate: book.publishedDate,
        image: book.image,
        genders: book.genders,
        authors: book.authors,
    });

    useEffect(() => {
        console.log(input);
        let values = Object.values(input);
        let notComplete = values.filter(
            (value) => value === "" || value.length === 0
        );
        if (!notComplete.length) setFormComplete(true);
    }, [input]);

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        if (e.target.name === "authors") {
            setInput({
                ...input,
                authors: [e.target.value], //traigo todo lo que esta en el array y le concateno el nuevo valor
            });
        } else if (e.target.name === "genders") {
            setInput({
                ...input,
                genders: [e.target.value], //traigo todo lo que esta en el array y le concateno el nuevo valor
            });
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formComplete) {
            dispatch(modifyBook(input));
            setSuccess(true); // al setearse en true apareceria un alert "succes"
            setInput({
                id: "",
                title: "",
                publisher: "",
                description: "",
                price: "",
                stock: "",
                publishedDate: "",
                image: "",
                authors: [],
                genders: [],
            });
        } else {
            alert("missing or incorrect data");
        }
    };

    return (
        <div className="row d-flex justify-content-center m-2">
            <form className="w-75" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Título:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Género:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="genders"
                            value={input.genders}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Autor:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="authors"
                            value={input.authors}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Editorial:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="publisher"
                            value={input.publisher}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Descripción:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Precio:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="number"
                            name="price"
                            value={input.price}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Stock:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="number"
                            name="stock"
                            value={input.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Fecha de publicación:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="publishedDate"
                            value={input.publishedDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 text-start">
                        <label className="form-label">Imagen:</label>
                    </div>
                    <div className="col-9">
                        <input
                            className="form-control"
                            type="text"
                            name="image"
                            value={input.image}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-center m-2">
                    <button className="btn btn-dark w-25" disabled={!formComplete} type="submit">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBookForm;
