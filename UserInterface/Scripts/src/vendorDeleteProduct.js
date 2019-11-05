import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Switch, Route, Link, Navigation } from 'react-router-dom';


class DeleteProduct extends React.Component {
    constructor(props) {
        super(props);
        this.OnDeleteProduct = this.OnDeleteProduct.bind(this);
        this.state ={
            product:{}
        }
    }
    OnDeleteProduct(e) {
        var url = window.location.href;
        var w = url.search("ProductDelete/")
        w = w + 14;
        var id = url.substring(w);
        $.post("/Vendor/ProductDelete", { id: id }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
        window.location.href = "/Vendor/";
    }

    componentDidMount() {
        var url = window.location.href;
        var w = url.search("ProductDelete/")
        w = w + 14;
        var id = url.substring(w);
        console.log(id);
        try {
            $.get("/Vendor/RGetProduct/" + id, function (data) {
                this.setState({
                    product: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    render() {
        console.log(this.state.product);
        return (
            <div>
            <h2>Are You sure you want to delete this product?</h2>
            <p>{this.state.product.NAME}</p>
            <p>Description:{this.state.product.DESCRIPTION}</p>
            <p>{this.state.product.PRICE}</p>
            <p>{this.state.product.CATEGORY}</p>
                <button onClick={this.OnDeleteProduct} >Delete</button>
            </div>
        );
    }
}

ReactDOM.render(<DeleteProduct />, document.getElementById("root"));
