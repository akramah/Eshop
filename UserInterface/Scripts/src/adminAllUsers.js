import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ButtonToolbar } from "react-bootstrap";

class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            userToDelete: {}
        };
    }
    onDelete(e) {
        try {
            $.get("/Admin/RDeleteUser/" + e.target.value, function (data) {
                this.setState({ userToDelete: data });
                this.props.onDelete(true, this.state.userToDelete);
            }.bind(this));
        }
        catch (error) {
            console.log("error" + error);
        }

    }
    render() {

        return (
            <tr>
                <td>{this.props.item.USER_ID}</td>
                <td>{this.props.item.NAME}</td>
                <td>{this.props.item.EMAIL}</td>
                <td>{this.props.item.PASSWORD}</td>
                <td>{this.props.item.RoleName}</td>
                <td><Button variant="danger" onClick={this.onDelete} id={this.props.item.USER_ID} value={this.props.item.USER_ID}> Delete</Button></td>

            </tr>
        )
    }
};



class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.popupState = this.popupState.bind(this);
        this.popupConfirmDelete = this.popupConfirmDelete.bind(this);        
        this.setAllUsers = this.setAllUsers.bind(this);
        this.state = {
            items: [],
            Modal: false,
            userToDelete: {}
        };
    }
    setAllUsers(){
        try {
            $.get("/Admin/AllUsersDTO/", function (data) {
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
        this.setAllUsers();
    }
    onDelete(popupState, userToDelete) {
        this.setState({
            Modal: popupState,
            userToDelete: userToDelete
        })

    }
    popupState(popupState) {
        this.setState({ Modal: popupState })
    }
    popupConfirmDelete(popupState) {
        this.setState({
            Modal: popupState
        })
        this.setAllUsers();
    }
    render() {

        var rows = [];
        rows = this.state.items.map((item) => <Rows key={item.USER_ID} item={item} onDelete={this.onDelete} />)

        return (
            <div>
                {this.state.Modal && <Popup popupState={this.popupState} userToDelete={this.state.userToDelete} popupConfirmDelete={this.popupConfirmDelete} />}
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Type</th>
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
        this.onConfirmDeleteUser = this.onConfirmDeleteUser.bind(this);
        this.state = {
            items: [],
            Modal: false
        };
    }
    close() {
        this.props.popupState(false);
    }
    onConfirmDeleteUser() {
        console.log(this.props.userToDelete.USER_ID);
        $.post("/Admin/DeleteUser", { id: this.props.userToDelete.USER_ID }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            this.props.popupConfirmDelete(false);
        }.bind(this));

    }
    render() {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={this.close}>
                        <Modal.Title>Delete User and all it's related entities?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>User Id:{this.props.userToDelete.USER_ID}</p>
                        <p>User Name:{this.props.userToDelete.NAME}</p>
                        <p>Email:{this.props.userToDelete.EMAIL}</p>
                        <p>Type:{this.props.userToDelete.RoleName}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.close}>Close</Button>
                        <Button variant="danger" onClick={this.onConfirmDeleteUser}>Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}


ReactDOM.render(<UserTable />, document.getElementById("root"));
