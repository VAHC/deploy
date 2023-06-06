import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailTotalCart from "./DetailTotalCart";
import { FormAddress } from "./FormAddress";
import { totalByitem } from "./helpers";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { totalPrice, totalItems } from "./helpers";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItems, emptyCart, fillCart } from "../../redux/action";

const CartContainer = () => {

    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    const [showModal, setShowModal] = useState(false); //estado local para mostrar o no el modal

    const toggleModal = () => { //funcion que setea showModal al booleano contrario en el que esta
        setShowModal(prevShowModal => !prevShowModal)
    }

    const onClose = () => {
        toggleModal()
      }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("items"))
        if(items) {
            dispatch(fillCart(items))
        } 
    }, [])

    const incrementQuantityHandler = (item) => {
        //console.log('add inicio' + item.quantity);
        dispatch(addToCart(item))
        //console.log('despacha la action');
        //console.log('add final ' + item.quantity);
    }

    const decrementQuantityHandler = (item) => {
        dispatch(removeFromCart(item));
    }

    const cleanCartHandler = () => {
        dispatch(emptyCart())
        localStorage.removeItem('items')
    }

    const deleteItemHandler = (id) => {
        dispatch(removeItems(id))
    }

    const handleConfirmCart = () => {
        user ?
        toggleModal()
        : navigate("/ingresar")
    }

    const handleConfirmOrder = () => {

    }
 
    return (
        <>
            <nav className="navbar navbar-light bg-dark mb-3">
                <div style={{ display: 'flex', justifyContent: 'space-evenly', }} className="container-fluid">
                    <h3 className="text-light">Tu carrito</h3>
                    <Link to="/catalogo"><button className="btn btn-light">Seguir comprando</button></Link>
                    <button className="btn btn-light" onClick={cleanCartHandler}>Vaciar carrito</button>
                    <div>
                        <i className="bi bi-cart text-light fs-3"></i>
                        <span className="badge bg-danger ms-1 rounded-circle">{totalItems(cart)}</span>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Container>
                            <Row>
                                <Col>
                                    <Table striped bordered hover>
                                        <tbody>
                                            {!cart.length ? (
                                                <tr>
                                                    <td colSpan="3">
                                                        <div>
                                                            <h6>Tu carrito está vacío...</h6>
                                                            <h5>¡Agregá tu primer libro o suscribite!</h5>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cart.map((item, index) => (
                                                    <tr id={item.id} key={index}>
                                                        <td>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <span>{item.title}</span>
                                                                    <br />
                                                                    <span>{item.authors}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <Button variant="primary" className="btn btn-sm me-2" onClick={() => { decrementQuantityHandler(item) }}><i className="bi bi-arrow-down-square" /></Button>
                                                                        <span className="me-2">{item.quantity}</span>
                                                                        {/* {console.log('log en item ' + item.quantity)} */}
                                                                        <Button variant="primary" className="btn btn-sm me-2" onClick={() => { incrementQuantityHandler(item) }}><i className="bi bi-arrow-up-square" /></Button>
                                                                    </div>
                                                                    <Button variant="danger" size="sm" onClick={() => { deleteItemHandler(item.id) }}><i className="bi bi-trash3" /></Button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="col-4">
                        <h4>Tu compra</h4>
                        <hr />
                        {!cart.length ? (<h5>Aún no agregaste nada al carrito</h5>) : (
                            <div>
                                {cart.map((detail, index) => (
                                    <DetailTotalCart
                                        key={index}
                                        id={detail.id}
                                        title={detail.title}
                                        price={detail.price}
                                        quantity={detail.quantity}
                                        totalByItem={totalByitem(detail.quantity, detail.price)}
                                    />
                                ))}
                            </div>
                        )}
                        <hr />
                        <h5>Total: ${totalPrice(cart)}.00</h5>
                        <hr />
                        <button onClick={handleConfirmCart} className="btn btn-secondary mb-2">Confirmar carrito</button>
                    </div>
                </div>
                {showModal && <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmá tu compra</h5>
                                <button onClick={onClose} className="btn btn-dark">Cerrar</button>
                            </div>
                            <div>
                                <div>
                                    {cart.map((detail, index) => (
                                        <DetailTotalCart
                                            key={index}
                                            id={detail.id}
                                            title={detail.title}
                                            price={detail.price}
                                            quantity={detail.quantity}
                                            totalByItem={totalByitem(detail.quantity, detail.price)}
                                        />
                                    ))}
                                </div>
                                <hr />
                                <h5>Total: ${totalPrice(cart)}.00</h5>
                                <hr />
                                <button onClick={handleConfirmOrder} className="btn btn-secondary mb-2">Confirmar compra</button>
                            </div>
                            <FormAddress toggleModal={toggleModal}
                                user={user}
                            />
                            <button className="btn btn-secondary mb-2">Pagar</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default CartContainer