import React from "react";
import { totalByitem } from "./helpers";

const DetailTotalCart = ({title, quantity, price}) => {
    console.log(quantity);
    console.log(price);
    return (
        <div className="d-flex justify-content-between px-2">
            <h6 className="d-inline">{title}</h6>
            <span className="d-inline">{quantity} und</span>
            <h5 className="d-inline">${totalByitem(quantity, price)}</h5>
        </div>
    )

}

export default DetailTotalCart