import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        //this.populateProduct = this.populateProduct.bind(this);
        this.state = {
            categories: [],
            product: {},
            ajax1: false,
            ajax2: false,
            id: 0
        };
    }

    handleEditProduct(product) {

        if (isNaN(product.PRICE)) {
            product.PRICE = 0;
        }

        if (isNaN(product.CATEGORY)) {
            product.CATEGORY = 1;
        }
        console.log("from parent");
        console.log(product);
        console.log(this.state.id);
        $.post("/Vendor/REditProduct", { name: product.NAME, description: product.DESCRIPTION, price: product.PRICE, image:product.IMAGE_URL, category:product.CATEGORY, id:this.state.id }, function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
        console.log("from hedit:"+this.state.product);
        window.location.href = "/Vendor/";

    }

    componentDidMount() {
        var url = window.location.href;
        var w = url.search("EditProduct/")
        //var q = url.search("?")
        //console.log(q);
        w = w + 12;
        var id = url.substring(w);
        this.setState({id: id});
        //console.log(id);
        try {
            $.get("/Vendor/rgetproduct/" + id, function (data) {
                this.setState({
                    ajax1: true,
                    product: data
                });
                //console.log("datta:  " + data);
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }

        try {
            $.get(this.props.dataUrl, function (data) {
                this.setState({
                    ajax2: true,
                    categories: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }

    }
    render() {
        if (this.state.ajax1 && this.state.ajax2) {

            return (
                <Form categories={this.state.categories} product={this.state.product} handleEditProduct={this.handleEditProduct}/>
            )
        }
        else {
            return null
        }
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangedes = this.handleChangedes.bind(this);
        this.handleChangepri = this.handleChangepri.bind(this);
        this.handleChangeimg = this.handleChangeimg.bind(this);
        this.state = {
            product: {}
        }

    }
    componentDidMount() {
        this.setState({
            product: this.props.product
        })
    }
    handleChangename(event) {
        this.setState({ product: { NAME: event.target.value } });
    }
    handleChangedes(event) {
        this.setState({ product: { DESCRIPTION: event.target.value } });
    }
    handleChangepri(event) {
        this.setState({ product: { PRICE: event.target.value } });
    }
    handleChangeimg(event) {
        this.setState({ product: { IMAGE_URL: event.target.value } });
    }
    handleEditProduct(e) {
        e.preventDefault();
        const pro = [];
        pro.NAME = e.target.elements.Name.value.trim();
        pro.DESCRIPTION = e.target.elements.Description.value.trim();
        pro.PRICE = parseInt(e.target.elements.Price.value.trim());
        pro.IMAGE_URL = e.target.elements.Image.value.trim();
        pro.CATEGORY = parseInt(e.target.elements.Category.value);
        console.log(pro);
        this.props.handleEditProduct(pro);
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleEditProduct}>
                    <input type="text" placeholder="Enter Name" name="Name" value={this.state.product.NAME} onChange={this.handleChangename}></input>
                    <br />
                    <input type="text" placeholder="Enter Description" name="Description" value={this.state.product.DESCRIPTION} onChange={this.handleChangedes}></input><br />
                    <input type="text" placeholder="Enter Price" name="Price" value={this.state.product.PRICE} onChange={this.handleChangepri}></input><br />
                    <input type="text" placeholder="Enter Image" name="Image" value={this.state.product.IMAGE_URL} onChange={this.handleChangeimg}></input><br />
                    <Select placeholder="--Select Category--" name="Category" options={this.props.categories} /><br /><br />
                    <button >submit</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<EditProduct dataUrl="/Vendor/GETcategories" />, document.getElementById("root"));
