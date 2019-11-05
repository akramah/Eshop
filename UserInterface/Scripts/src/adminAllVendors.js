import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ButtonToolbar } from "react-bootstrap";

class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            vendorToDelete: {}
        };
    }
    onDelete(e) {
        try {
            $.get("/Admin/RDeleteVendor/" + e.target.value, function (data) {
                this.setState({ vendorToDelete: data });
                this.props.onDelete(true, this.state.vendorToDelete);
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
                <td>{this.props.item.USER_ID}</td>
                <td>{this.props.item.OWNER_ID}</td>
                <td>{this.props.item.NAME}</td>
                <td>{this.props.item.PHONE}</td>
                <td>{this.props.item.EMAIL}</td>
                <td>{this.props.item.STORE_NAME}</td>
                <td><Button variant="danger" onClick={this.onDelete} id={this.props.item.OWNER_ID} value={this.props.item.OWNER_ID}> Delete</Button></td>

            </tr>
        )
    }
};



class VendorTable extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.popupState = this.popupState.bind(this);
        this.popupConfirmDelete = this.popupConfirmDelete.bind(this);        
        this.setAllVendors = this.setAllVendors.bind(this);
        this.state = {
            items: [],
            proid: 0,
            Modal: false,
            productToDelete: {}
        };
    }
    setAllVendors(){
        try {
            $.get("/Admin/AllVendorsDTO/", function (data) {
                this.setState({
                    items: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    componentDidMount() {
        this.setAllVendors();
    }
    onDelete(popupState, vendorToDelete) {
        this.setState({
            Modal: popupState,
            productToDelete: vendorToDelete
        })

    }
    popupState(popupState) {
        this.setState({ Modal: popupState })
    }
    popupConfirmDelete(popupState) {
        this.setState({
            Modal: popupState
        })
        this.setAllVendors();
    }
    render() {

        var rows = [];
        rows = this.state.items.map((item) => <Rows key={item.OWNER_ID} item={item} onDelete={this.onDelete} />)

        return (
            <div>
                {this.state.Modal && <Popup popupState={this.popupState} productToDelete={this.state.productToDelete} popupConfirmDelete={this.popupConfirmDelete} />}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Store Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Store Name</th>
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
    close() {
        this.props.popupState(false);
    }
    onConfirmDeleteProduct() {
        console.log(this.props.productToDelete.OWNER_ID);
        $.post("/Admin/DeleteVendor", { id: this.props.productToDelete.OWNER_ID }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            this.props.popupConfirmDelete(false);
        }.bind(this));

    }
    render() {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={this.close}>
                        <Modal.Title>This Store and all it's products will be deleted. Proceed?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Store Id:{this.props.productToDelete.OWNER_ID}</p>
                        <p>Owner NAME:{this.props.productToDelete.NAME}</p>
                        <p>Store Name:{this.props.productToDelete.STORE_NAME}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.close}>Close</Button>
                        <Button variant="danger" onClick={this.onConfirmDeleteProduct}>Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}


ReactDOM.render(<VendorTable />, document.getElementById("root"));
