import { useSelector } from "react-redux";
import { useState } from "react";
import { FormEditUser } from "./FormEditUser";

export const Profile = () => {

    const user = useSelector((state) => state.user);

    //const user = { id: 3, firstName: 'Juan', lastName: 'Topo', email: 'juan@mail.com', password: "gefefe11", phone: 0, profile: "user" }

    const [showModal, setShowModal] = useState(false); //estado local para mostrar o no el modal

    const toggleModal = () => { //funcion que setea showModal al booleano contrario en el que esta
        setShowModal(prevShowModal => !prevShowModal)
    }

    const onClose = () => {
        toggleModal()
      }

    return (
        <>
            {user && <div>
                <h2 className="text-center">Mi perfil</h2>
                <div className="d-flex justify-content-center my-3">
                    <div className="card mb-3 w-75 d-flex justify-content-center">
                        <div className="row g-0 ">
                            <div className="col-md-8">
                                <img src="./images/photoProfile.jpg" className="img-fluid rounded-start max-heigth mw-50" alt="Imagen de un libro y un té" />
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h5 className="card-title m-3 text-center">¡Hola {user.firstName}!</h5>
                                    <p className="card-text fw-bold ms-3">Mi correo electrónico:</p>
                                    <p className="card-text ms-3">{user.email}</p>
                                    <p className="card-text fw-bold ms-3">Mi teléfono:</p>
                                    <p className="card-text ms-3">{user.phone ? user.phone : "-"}</p>
                                    <div className="d-flex justify-content-center">
                                        <button onClick={toggleModal} className="btn btn-dark w-50">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editá tus datos</h5>
                                <button onClick={onClose} className="btn btn-dark">Cerrar</button>
                            </div>
                            <FormEditUser toggleModal={toggleModal}
                                         user={user}
                                         />
                        </div>
                    </div>
                </div>
                }
            </div>}
        </>
    )
}