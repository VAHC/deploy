import { useState } from "react";
import { Link } from "react-router-dom";
import { URL_Railway } from "../../../ruta";
import axios from "axios";

export const FormResetPass = ({ setCompoActivo }) => {

    const onClickHandler = (nombreCompo) => { return setCompoActivo(nombreCompo) }

    const [mail, setMail] = useState("")

    const [error, setError] = useState("")

    const [success, setSuccess] = useState(false)

    const handleInputChange = (event) => {
        const inputMail = event.target.value
        setMail(inputMail)
        const validationResult = validation(inputMail)
        setError(validationResult)
    }

    const handleClickPass = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${URL_Railway}/users/password`, { email: mail });
            setSuccess(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {success && <div className="d-flex justify-content-center m-2">
                <div className="card w-75 my-5">
                    <div className="card-body">
                        <p className="card-text text-center fs-4">
                            ¡Listo! Revisá tu correo. Te enviamos las instrucciones para restablecer tu contraseña.
                        </p>
                    </div>
                </div>
            </div>}
            {!success && <div>
                <h2 className='text-center fs-1 my-3 fs-2'>Recuperar contraseña</h2>
                <div className="d-flex justify-content-center m-2">
                    <div className="card w-75 mb-5">
                        <div className="card-body">
                            <p className="card-text text-center">
                                Escribí tu mail para que te enviemos un correo para crear una nueva contraseña
                            </p>
                            <form>
                                <div className="mb-3 text-center">
                                    <label className="form-label" htmlFor="email">Correo electrónico</label>
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="ejemplo@email.com"
                                        value={mail}
                                        onChange={handleInputChange}
                                    />
                                    {error && <p className="text-danger">{error}</p>}
                                </div>
                                <div className="text-center mb-3">
                                    <button className={error === "" ? "btn btn-dark w-50" : "btn btn-dark w-50 disabled"} onClick={handleClickPass}>Restablecer contraseña</button>
                                </div>

                                <div className="text-center">
                                    <Link className="card-text text-reset text-decoration-none fw-bold fs-6" onClick={() => onClickHandler('login')}>
                                        <i className="bi bi-arrow-left-circle-fill fs-5 mx-1"></i>Volver
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div></div>
            }
        </div>
    )
}

const validation = (mail) => {
    let error = ""
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
        error = "Escribí un email válido"
    }
    return error
}