import { useState } from "react";
import { useDispatch } from "react-redux";

export const FormAddress = () => {

    const dispatch = useDispatch();
    
    //Estado local para los inputs del form
    const [inputs, setInputs] = useState({
        calle: "",
        piso: "",
        ciudad: "",
        CP: 0,
        provincia: ""
    })

    const [errors, setErrors] = useState({
        calle: "",
        piso: "",
        ciudad: "",
        CP: 0,
        provincia: ""
    })

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //dispatch(createUser(inputs))
    }

    return (
        <div className="d-flex justify-content-center m-2">
            <form className="row g-2 md-2 w-75" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="calle" className="form-label">Calle y número:</label>
                    <input type="text" className="form-control" name="calle" value={inputs.calle} onChange={handleInputChange} required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="piso" className="form-label">Piso y departamento:</label>
                    <input type="text" className="form-control" name="piso" value={inputs.piso} onChange={handleInputChange} required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                    <input type="text" className="form-control" name="ciudad" value={inputs.ciudad} onChange={handleInputChange} required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="CP" className="form-label">Código postal:</label>
                    <input type="number" className="form-control" name="CP" value={inputs.CP} onChange={handleInputChange} required />
                </div>

                <div className="col-md-4">
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <input type="text" className="form-control" name="provincia" value={inputs.provincia} onChange={handleInputChange} />
                </div>

                <div className="col-12 d-flex justify-content-center m-1">
                    <button className={Object.keys(errors).length === 0 ? "btn btn-dark" : "btn btn-dark disabled"} type="submit">Confirmar domicilio</button>
                </div>
            </form>
        </div>
    )
}