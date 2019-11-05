import React from 'react';
import ReactDOM from 'react-dom';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.state = {
            ajax1: false,
            userProfile:{}
        };
    }
    handleEditProfile(upro) {
        console.log("from parent");
        console.log(upro);
        $.post("/Vendor/REditProfile", {OID: upro.OID, name: upro.Name, storename: upro.Storename, phone: upro.Phone, email:upro.Email, UID:upro.UID }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
        window.location.href = "/Vendor/";

    }
    componentDidMount(){
        try {
            $.get("/Vendor/rgetprofile/" , function (data) {
                this.setState({
                    ajax1: true,
                    userProfile: data
                });

            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    render() {
        if(this.state.ajax1){
            return (
                <Form userProfile={this.state.userProfile} handleEditProfile={this.handleEditProfile}/>
            )
        }
        else{
            return null
        }
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangestrname = this.handleChangestrname.bind(this);
        this.handleChangepho = this.handleChangepho.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.state = {
            userProfile: {}
        };
    }
    handleChangename(event) {
        this.setState({ userProfile: { NAME: event.target.value } });
    }
    handleChangestrname(event) {
        this.setState({ userProfile: { STORE_NAME: event.target.value } });
    }
    handleChangepho(event) {
        this.setState({ userProfile: { PHONE: event.target.value } });
    }
    handleChangeemail(event) {
        this.setState({ userProfile: { EMAIL: event.target.value } });
    }
    componentDidMount() {
        this.setState({
            userProfile: this.props.userProfile
        })
    }
    handleEditProfile(e) {
        e.preventDefault();
        const upro = [];
        upro.OID= this.props.userProfile.OWNER_ID;
        upro.Name = e.target.elements.Name.value.trim();
        upro.Storename = e.target.elements.Storename.value.trim();
        upro.Phone = parseInt(e.target.elements.Phone.value.trim());
        upro.Email = e.target.elements.Email.value.trim();
        upro.UID = this.props.userProfile.USER_ID;
        console.log(upro);
        this.props.handleEditProfile(upro);
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleEditProfile}>
                    <input type="text" placeholder="Enter Name" name="Name" value={this.state.userProfile.NAME} onChange={this.handleChangename}></input>
                    <br />
                    <input type="text" placeholder="Enter Store Name" name="Storename" value={this.state.userProfile.STORE_NAME} onChange={this.handleChangestrname}></input><br />
                    <input type="text" placeholder="Enter Phone" name="Phone" value={this.state.userProfile.PHONE} onChange={this.handleChangepho}></input><br />
                    <input type="text" placeholder="Enter Email for consumers" name="Email" value={this.state.userProfile.EMAIL} onChange={this.handleChangeemail}></input><br />
                    <button >submit</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<EditProfile />, document.getElementById("root"));
