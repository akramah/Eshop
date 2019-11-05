import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';


class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddProfile = this.handleAddProfile.bind(this);
        this.state = {

        };
    }
    handleAddProfile(e) {
        e.preventDefault();
        const upro = [];
        upro.Name = e.target.elements.Name.value.trim();
        upro.Storename = e.target.elements.Storename.value.trim();
        upro.Phone = parseInt(e.target.elements.Phone.value.trim());
        upro.Email = e.target.elements.Email.value.trim();
        $.post("/Vendor/RCreateProfile", { name: upro.Name, Storename: upro.Storename, Phone: upro.Phone, Email:upro.Email}, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
        window.location.href = "/Vendor/";
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddProfile}>
                    <input type="text" placeholder="Enter Name" name="Name"></input>
                    <br />
                    <input type="text" placeholder="Enter Store Name" name="Storename"></input><br />
                    <input type="text" placeholder="Enter Phone" name="Phone"></input><br />
                    <input type="text" placeholder="Enter Email" name="Email"></input><br /><br /><br />
                    <button >submit</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<CreateProfile />, document.getElementById("root"));
