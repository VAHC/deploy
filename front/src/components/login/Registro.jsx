import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import validation from "./validationRegistro";
import { useDispatch } from 'react-redux';
import { createUser } from "../../redux/action";
import {URL_Railway} from '../../../ruta'

export const Registro = () => {

    //const URL = URL_Railway+"/books/auth/authSocial"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estado local para los inputs del form
    const [userInputs, setUserInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    })

    //Estado local para los inputs de confirmación del form
    const [inputsConfirm, setInputsConfirm] = useState({
        emailC: "",
        passwordC: ""
    })

    //Estado local para los errores
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        phone: "",
        password: "",
        passwordConfirm: ""
    })

    //Estado local para renderizado de una imagen de registro exitoso
    const [userCreated, setUserCreated] = useState(false)

    //UseEffect para controlar los estados
    useEffect(() => {
        const validationErrors = validation(userInputs, inputsConfirm);
        setErrors(validationErrors)
    }, [userInputs, inputsConfirm])

    //Función para controlar los inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUserInputs({
            ...userInputs,
            [name]: value
        })

        if (name === "emailC" || name === "passwordC") {
            setInputsConfirm({
                ...inputsConfirm,
                [name]: value
            })
        }
        setErrors(validation(userInputs, inputsConfirm, { [name]: value }))
    }

    //Función para despachar la action con la data y capturar la respuesta del back
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createUser(userInputs))
            .then((response) => {
                if (response.status === 200) {
                    setUserCreated(true);
                    setTimeout(() => setUserCreated(false), 3000)
                    setTimeout(() => navigate("/ingresar"), 3000)
                } else alert("ERROR")
            })
            .catch((error) => {
                alert("Server error")
            })
    }

    //REGISTRO CON GOOGLE
    const handleClick = async () => {
        window.location.href = `${URL_Railway}/auth/google`;
    }

    return (
        <div>
            <h2 className='text-center fs-1'>Registro</h2>
            {userCreated && <div className="d-flex justify-content-center">
                                <img src="./images/userSuccess.png" className="w-25" alt="success" />
                            </div>}
            {!userCreated && <div className="card mx-5 my-3">
                <div className="d-flex justify-content-center m-2">
                    <form className="row g-2 md-2 w-75" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="firstName" value={userInputs.firstName} onChange={handleInputChange} required />
                            {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="lastName" value={userInputs.lastName} onChange={handleInputChange} required />
                            {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input type="text" className="form-control" name="email" value={userInputs.email} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="emailC" className="form-label">Confirmar correo electrónico</label>
                            <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input type="text" className="form-control" name="emailC" value={inputsConfirm.emailC} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>

                        <div className="col-md-6">
                            {errors.emailConfirm && <p className="text-danger">{errors.emailConfirm}</p>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="phone" className="form-label">Teléfono (opcional)</label>
                            <input type="tel" className="form-control" name="phone" value={userInputs.phone} onChange={handleInputChange} />
                            {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" value={userInputs.password} onChange={handleInputChange} required />
                            {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="passwordC" className="form-label">Confirmar contraseña</label>
                            <input type="password" className="form-control" name="passwordC" value={inputsConfirm.passwordC} onChange={handleInputChange} required />
                            {errors.passwordConfirm && <p className="text-danger">{errors.passwordConfirm}</p>}
                        </div>

                        <div className="col-12 d-flex justify-content-center m-1">
                            <button className={Object.keys(errors).length === 0 ? "btn btn-dark" : "btn btn-dark disabled"} type="submit">Registrarme</button>
                        </div>

                        <div className="col-12 d-flex justify-content-center m-1">
                            <div className='col-auto text-center'>
                                <button onClick={handleClick} className="btn btn-outline-dark">
                                    <i className="bi bi-google fs-3 mx-2"></i>Registrarme con G-mail
                                </button>
                            </div>
                        </div>

                        <div className="row text-center m-2">
                            <p className="card-text">
                                ¿Ya tenés cuenta? <Link to="/ingresar">Ingresá</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}