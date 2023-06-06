import React from "react";
import { totalByitem } from "./helpers";

const DetailTotalCart = ({title, quantity, price}) => {
    //console.log('deatail ' + quantity);
    // console.log(price);
    return (
        <div className="row">
            <div className="col-3 mb-3">
                <span className="d-inline">{quantity} und{quantity > 1 ? 's' : ''}</span>
            </div>
            <div className="col-6 mb-3">
                <h6 className="d-inline">{title}</h6>
            </div>
            <div className="col-3 mb-3">
                <h5 className="d-inline">${totalByitem(quantity, price)}</h5>
            </div>
        </div>
    )

}

export default DetailTotalCart