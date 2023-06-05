import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_Railway } from "../../../ruta";
import axios from "axios";

export const ChangePass = () => {

    const navigate = useNavigate()

    const [pass, setPass] = useState("")

    const [error, setError] = useState("")

    const handleInputChange = (event) => {
        const inputPass = event.target.value
        setPass(inputPass)
        const validationResult = validation(inputPass)
        setError(validationResult)
    }

    const handleClickPass = async (event) => {
        event.preventDefault()

        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        try {
            const response = await axios.post(`${URL_Railway}/users/password/${token}`, { password: pass });
            console.log(response.data.message)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="d-flex justify-content-center my-3">
            <div className="card mb-3 w-75 d-flex justify-content-center">
                <div className="row g-0 ">
                    <div className="col-md-6">
                        <img src="./images/loginImg.jpg" className="img-fluid rounded-start max-heigth mw-50" alt="Imagen de un libro y un té" />
                    </div>
                    <div className="col-md-6">
                        <h2 className='text-center fs-2 my-3'>Restablecer contraseña</h2>
                        <div className="d-flex justify-content-center m-2">
                            <div className="card w-75 mb-5">
                                <div className="card-body">
                                    <p className="card-text text-center">
                                        Ingresá la nueva contraseña con la que te autenticarás en Rayuela
                                    </p>
                                    <form>
                                        <div className="mb-3 text-center">
                                            <input className="form-control"
                                                type="password"
                                                name="pass"
                                                value={pass}
                                                onChange={handleInputChange}
                                            />
                                            {error && <p className="text-danger">{error}</p>}
                                        </div>
                                        <div className="text-center mb-3">
                                            <button className={error === "" ? "btn btn-dark w-50" : "btn btn-dark w-50 disabled"} onClick={handleClickPass}>Cambiar contraseña</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const validation = (pass) => {
    let error = ""
    if (!/\d/.test(pass)) {
        error = "Tu contraseña debe contener al menos un número"
    }
    if (pass.length < 8 || pass.length > 10) {
        error = "Tu contraseña debe tener entre 8 y 10 caracteres"
    }
    return error
}