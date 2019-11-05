import React from 'react';
import ReactDOM from 'react-dom';

const Rows = (props) => {
    //if (props.item.CATEGORY_ID)
    return (
        <tr>
            <td>{props.item.NAME}</td>
            <td>{props.item.DESCRIPTION}</td>
            <td>{props.item.PRICE}</td>
            <td>{props.item.IMAGE_URL}</td>
            <td>{props.item.STORE_NAME}</td>
            <td>{props.item.CATEGORY}</td>
            <td><button>Add to cart</button></td>

        </tr>

    )
};

export default Rows;