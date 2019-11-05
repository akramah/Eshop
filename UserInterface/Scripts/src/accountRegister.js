import React from 'react';
import ReactDOM from 'react-dom';
import { Col, validated, Form, Button, FormGroup, FormControl, ControlLabel, InputGroup } from "react-bootstrap";
import Select from 'react-select';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            exists: false,
            roles: []
        };
    }
    
    componentDidMount() {
        try {
            $.get(this.props.dataUrl, function (data) {
                this.setState({
                    roles: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = {};
        user.NAME =e.target.elements.name.value.trim();
        user.EMAIL = e.target.elements.email.value.trim();
        user.PASSWORD = e.target.elements.pwd.value.trim();
        user.RoleId = parseInt(e.target.elements.role.value.trim());
        $.post("/Account/Register", { user:user }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if(data == "exists"){
                this.setState({
                    exists:true
                })
            }
            if(data == 2){
                window.location.href = "/Vendor/CreateProfile";
            }
            if(data == 3){
                window.location.href = "/Consumer/";
            }
        }.bind(this));
    };
    render() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: 'black',
                padding: 20
                
              }),
              control: styles => ({ ...styles, backgroundColor: 'white',width: 200 }),
          }
          
        return (
            <Form onSubmit={this.handleSubmit}>
            {this.state.exists && <h2 className="text-danger"> EMAIL ALREADY EXISTS!!! </h2>}
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" name="name"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
              </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="pwd"/>
                </Form.Group>

                <Select placeholder="--Select Role--" name="role" options={this.state.roles} styles={customStyles}/><br /><br />

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        )
    }

}

ReactDOM.render(<Register dataUrl="/Account/Rgetroles"/>, document.getElementById("root"))