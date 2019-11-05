import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Navigation } from 'react-router-dom';
import Select from 'react-select';
import Image from 'react-bootstrap/Image';
////////VENDOR OWN STORE///////////
//import Rows from './comps/ConProRow';

//this.Details = this.Details.bind(this);
//<button onClick={this.Details}>Details</button>|
// Details(e) {
//     window.location.href = "/Vendor/ProductDetails";
// }
class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.Edit = this.Edit.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.Delete = this.Delete.bind(this);
    }
    Edit(e) {
        window.location.href = "/Vendor/EditProduct/" + e.target.id;
    }

    Delete(e) {
        window.location.href = "/Vendor/ProductDelete/" + e.target.id;
    }
    addPicture(e){
        window.location.href = "/Vendor/AddPicture/" + e.target.id;
    }
    //console.log(props);
    render() {
        var a=this.props.item.IMG
        var res;
        //console.log(this.props.item.IMG);
        if(a != null)
        {
        //console.log(this.props.item)
        var res = a.slice(49);
     }
        return (
            <tr>
                <td>{this.props.item.NAME}</td>
                <td>{this.props.item.DESCRIPTION}</td>
                <td>{this.props.item.PRICE}</td>
                <td><Image src={res} rounded /></td>
                <td>{this.props.item.CATEGORY}</td>
                <td><button onClick={this.Edit} id={this.props.item.PRODUCT_ID}>Edit</button>|<button onClick={this.Delete} id={this.props.item.PRODUCT_ID}>Delete</button></td>

            </tr>
        )
    }
};



class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.AddProduct = this.AddProduct.bind(this);
        this.state = {
            items: [],
            proid: 0
        };
    }

    componentDidMount() {


$(function () {
                console.log("started...");
                console.log(this.state.role);

                var hub = $.connection.echoHub;
                $.connection.logging = true;
                $.connection.url = "/realtime";
                hub.client.message = function (text) {
                    $(".inner").append(text + "<br />");
                };
                hub.client.isorder = function (orders) {
                    hub.server.join(orders);
                    hub.server.messageToGroup("you have orders");
                   // $(".inner").append(text + "<br />");
                };
               
                $.connection.hub.start().done(function () {
                    
                        var text = "this.state.role;";
                        hub.server.broadcast(text);
                        hub.server.join("CheckSale");
                       // hub.server.messageToGroup("you have orders");
                    

                }.bind(this));
            }.bind(this));



        try {
            $.get(this.props.dataUrl, function (data) {
                this.setState({
                    items: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    AddProduct(e) {
        window.location.href = "/Vendor/AddProduct/";
    }
    render() {

        var rows = [];
        rows = this.state.items.map((item) => <Rows key={item.PRODUCT_ID} item={item} addToCart={this.addToCart} />)

        return (
            <div>
            <div class="inner"></div>
                <button onClick={this.AddProduct}>New Product</button>
                <table className="table table-bordered table-responsive table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }
    handleAddProduct(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.func}>
                    <input type="text" placeholder="Enter Name" name="Name"></input>
                    <br />
                    <input type="text" placeholder="Enter Description" name="Description"></input><br />
                    <input type="text" placeholder="Enter Price" name="Price"></input><br />
                    <input type="text" placeholder="Enter Image" name="Image"></input><br />
                    <Select placeholder="--Select Category--" name="Category" /><br /><br />
                    <button>submit</button>
                </form>
            </div>
        );
    }
}


//ReactDOM.render(<Routess />, document.getElementById("root"));
ReactDOM.render(<ProductTable dataUrl="/Vendor/rindex" />, document.getElementById("root"));
//ReactDOM.render(<ProductTable dataUrl="/Consumer/Getpro" />, document.getElementById("root"));








// class Routess extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <h1>Estore</h1>
//                 <Router>
//                     <div>
//                         <ul>
//                             <li>
//                                 <Link to="/Vendor">Vendor Products</Link>
//                             </li>
//                             <li>
//                                 <Link to="/Vendor/AddProduct">Add Products</Link>
//                             </li>
//                             <li>
//                                 <Link to="/Vendor">Dashboard</Link>
//                             </li>
//                         </ul>
//                         <hr />

//                         <Switch>
//                             <Route exact path="/Vendor">
//                                 <ProductTable dataUrl="/Vendor/rindex" />
//                             </Route>
//                             <Route path="/Vendor/AddProduct">
//                                 <AddProduct />
//                             </Route>
//                             <Route path="/dashboard">

//                             </Route>
//                         </Switch>
//                     </div>
//                 </Router>
//             </div>
//         );
//     }
// }

