import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Try extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            lin: true
        };
    }
    handleLogin(e) {
        e.preventDefault();

        const userLogin = {};
        userLogin.EMAIL = e.target.elements.email.value.trim();
        userLogin.PASSWORD = e.target.elements.password.value.trim();
        console.log("handlelogin:" + userLogin);
        $.post("/Account/RLogin", { user: userLogin }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if (status == "success") {
                $.get("/Account/Rafterlogin", function (data) {
                    console.log("Data: " + data + "\nStatus: " + status);
                    if (data == 1 || data == 2 || data == 3) {
                        window.location.href = "/Account/afterlogin";
                    }
                    else {
                        this.setState({
                            lin: false
                        })
                    }
                }.bind(this))
            }
        }.bind(this))

    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                        {this.state.lin && <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>}
                        {!this.state.lin && <Form.Text className="text-danger"> Wrong email or password. Please Try again </Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
              </Button>
                </Form>
                <p>rend</p>
            </div>

           
        )
    }
}


ReactDOM.render(<Try />, document.getElementById("root"));