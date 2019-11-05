import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ButtonToolbar } from "react-bootstrap";

class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            productToDelete:{}
        };
    }
    onDelete(e) {
        try {
            $.get("/Admin/RDeleteProduct/" + this.props.item.PRODUCT_ID, function (data) {
                this.setState({productToDelete: data});
                this.props.onDelete(true, this.state.productToDelete);
            }.bind(this));
        } 
        catch (error) {
            console.log("error" + error);
        }
    }
    //console.log(props);
    render() {
        
        return (
            <tr>
                <td>{this.props.item.PRODUCT_ID}</td>
                <td>{this.props.item.Owner_Id}</td>
                <td>{this.props.item.NAME}</td>
                <td>{this.props.item.DESCRIPTION}</td>
                <td>{this.props.item.PRICE}</td>
                <td>{this.props.item.IMAGE_URL}</td>
                <td>{this.props.item.STORE_NAME}</td>
                <td>{this.props.item.CATEGORY}</td>
                <td><Button variant="danger" onClick={this.onDelete} id={this.props.item.PRODUCT_ID} value={this.props.item.PRODUCT_ID}> Delete</Button></td>

            </tr>
        )
    }
};



class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.popupState = this.popupState.bind(this);
        this.popupConfirmDelete = this.popupConfirmDelete.bind(this);
        this.state = {
            items: [],
            proid: 0,
            Modal: false,
            productToDelete:{}
        };
    }

    componentDidMount() {
        try {
            $.get("/Admin/AllProductsDTO/", function (data) {
                this.setState({
                    items: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    onDelete(popupState, productToDelete){
        this.setState({
            Modal: popupState,
            productToDelete: productToDelete
        })
       
    }
    popupState(popupState){
        this.setState({Modal: popupState})
    }
    popupConfirmDelete(popupState, pid){
        this.setState({
            Modal: popupState
        })
        console.log(pid);
        $.post("/Admin/DeleteProduct", { id: pid }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            //componentDidMount();
            $.get("/Admin/AllProductsDTO/", function (datanew) {
                this.setState({
                    items: datanew
                });
            }.bind(this));
        }.bind(this));
    }
    render() {

        var rows = [];
        rows = this.state.items.map((item) => <Rows key={item.PRODUCT_ID} item={item} onDelete={this.onDelete} />)

        return (
            <div>
                {this.state.Modal && <Popup popupState={this.popupState} productToDelete={this.state.productToDelete} popupConfirmDelete={this.popupConfirmDelete}/>}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Owner Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Store Name</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.onConfirmDeleteProduct = this.onConfirmDeleteProduct.bind(this);
        this.state = {
            items: [],
            proid: 0,
            Modal: false
        };
    }
    close(){
        this.props.popupState(false);
    }
    onConfirmDeleteProduct(){
        console.log(this.props.productToDelete.PRODUCT_ID);
        this.props.popupConfirmDelete(false,this.props.productToDelete.PRODUCT_ID);
    }
render()
    {return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton onClick={this.close}>
                    <Modal.Title>Are you sure you want to delete this product?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Product Id:{this.props.productToDelete.PRODUCT_ID}</p>
                    <p>Product NAME:{this.props.productToDelete.NAME}</p>
                    <p>Owner Id:{this.props.productToDelete.Owner_Id}</p>
                    <p>Store Name:{this.props.productToDelete.STORE_NAME}</p>
                    <p>Category:{this.props.productToDelete.CATEGORY}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>Close</Button>
                    <Button variant="danger" onClick={this.onConfirmDeleteProduct}>Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );}
}


ReactDOM.render(<ProductTable />, document.getElementById("root"));
