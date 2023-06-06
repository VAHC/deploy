import { useState } from "react";
import { Login } from "./Login";
import { FormResetPass } from "./FormResetPass";
import { Registro } from "./Registro";

export const Ingreso = () => {

    const [compoActivo, setCompoActivo] = useState("login")

    const compoRender= ()=>{
        if (compoActivo === "login") return <Login setCompoActivo={setCompoActivo}/>
        if (compoActivo=== "formPass") return <FormResetPass setCompoActivo={setCompoActivo}/>
        if (compoActivo=== "registro") return <Registro setCompoActivo={setCompoActivo}/>
    }

    return (
        <div className="d-flex justify-content-center my-3">
                    <div className="card mb-3 w-75 d-flex justify-content-center">
                        <div className="row g-0 ">
                            <div className="col-md-6">
                                <img src="./images/loginImg.jpg" className="img-fluid rounded-start max-heigth mw-50" alt="Imagen de un libro y un té" />
                            </div>
                            <div className="col-md-6">
                                {compoRender()}
                            </div>
                        </div>
                    </div>
                </div>
    )
}