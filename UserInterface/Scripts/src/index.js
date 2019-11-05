import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Table, Button, Modal, ButtonToolbar } from "react-bootstrap";
import App from './comps/App';
import Image from 'react-bootstrap/Image';

class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.cartp = this.cartp.bind(this);

        this.state = {
            productsInCart: []
        }

    }
    cartp() {
        $.get("/consumer/RProductsInCart", function (data) {
            this.setState({
                productsInCart: data
            });
        }.bind(this));
    }
    addToCart(e) {
        console.log(e.currentTarget.value);
        $.post("/Consumer/RAddToCart", { id: e.currentTarget.value }, function (data, status) {
            //console.log("Data: " + data + "\nStatus: " + status);
            this.setState({
                productsInCart: data
            })
            this.props.addToCart(this.state.productsInCart);

/////////

////////

        }.bind(this));
    }
    componentDidMount() {
        //this.props.addToCart(this.state.productsInCart);
    }
    render() {
        var asd = {
            'height': '50px',
            'width': '50px'
        }
        var a = this.props.item.IMG
        var res;
        console.log(this.props.item.IMG);
        if (a != null) {
            console.log(this.props.item)
            var res = a.slice(49);
            asd = {
                'height': '250px',
                'width': '250px'
            }
        }
        return (
            <tr>
                <td>{this.props.item.NAME}</td>
                <td>{this.props.item.DESCRIPTION}</td>
                <td>{this.props.item.PRICE}</td>
                <td><Image src={res} rounded style={asd} /></td>
                <td>{this.props.item.STORE_NAME}</td>
                <td>{this.props.item.CATEGORY}</td>

                <td><Button variant="primary" onClick={this.addToCart} id={this.props.item.PRODUCT_ID} value={this.props.item.PRODUCT_ID}><span class="glyphicon glyphicon-shopping-cart"></span> Add To Cart</Button></td>
            </tr>
        )
    }
};

class PopupRows extends React.Component {
    constructor(props) {
        super(props);
        this.removeFromcart = this.removeFromcart.bind(this);



    }
    removeFromcart(e) {
        console.log(e.currentTarget.value);
        $.post("/Consumer/Remove", { id: e.currentTarget.value }, function (data, status) {
            // console.log("Data: " + data + "\nStatus: " + status);
            this.props.cartpb();

        }.bind(this));

    }
    componentDidMount() {

    }
    render() {
        //console.log("from prow")
        //console.log(this.props.item);
        const SubTotal = this.props.item.Quantity * this.props.item.product.PRICE;
        return (
            <tr>
                <td>{this.props.item.product.PRODUCT_ID}</td>
                <td>{this.props.item.product.NAME}</td>
                <td>{this.props.item.product.PRICE}</td>
                <td>{this.props.item.Quantity}</td>
                <td>{SubTotal}</td>
                <td><Button variant="danger" onClick={this.removeFromcart} id={this.props.item.PRODUCT_ID} value={this.props.item.product.PRODUCT_ID}><span class="glyphicon glyphicon-shopping-cart"></span> Remove From Cart</Button></td>
            </tr>
        )
    }
};

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.cartpb = this.cartpb.bind(this);
        this.onCheckout = this.onCheckout.bind(this);
        this.csh = this.csh.bind(this);
        this.state = {
            items: [],
            Modal: false,
            total: 0,
            openc: false
        };
    }
    cartpb(a) {
        this.props.cartp();

    }
    onCheckout() {
        $.get("/consumer/RProductsInCart", function (data) {
            this.setState({
                items: data
            });
////////////////////////////////////////////



$(function () {

    var hub = $.connection.echoHub;
    $.connection.logging = true;
    $.connection.url = "/realtime";
    hub.client.message = function (text) {
        //$(".inner").append(text + "<br />");
    };
    $.connection.hub.start().done(function () {
        var ownersAll=  this.state.items.map((item) => parseInt(item.product.Owner_Id))
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    var owners = ownersAll.filter( onlyUnique );
        hub.server.checkout(owners);
    }.bind(this));
}.bind(this));


///////////////////////////////////////////
            var t = []
            t = this.state.items.map((item) => parseInt(item.product.PRICE) * parseInt(item.Quantity))

            this.setState({
                total: t.reduce((a, b) => a + b, 0),
                openc: true
            })

            console.log(this.state.total)
        }.bind(this));
    }
    csh() {
        this.setState({
            openc: false
        })
    }
    close() {
        this.props.popupState(false);
    }
    render() {
        var rows = [];
        const a = {
            'position': 'relative',
            'height': '250px',
            'overflow': 'auto',
            'display': 'block'
        }

        rows = this.props.productsInCart.map((item) => <PopupRows key={item.PRODUCT_ID} item={item} cartpb={this.cartpb} />)
        //console.log("from:" + this.cartpb);
        return (
            <div>
                <div style={a}>
                    <h1>CART</h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sub Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                            <Button variant="success" onClick={this.onCheckout}>Checkout</Button>
                        </tbody>
                    </Table>
                </div>
                {this.state.openc && <Checkout total={this.state.total} csh={this.csh} />}
            </div>
        );
    }
}

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.csh = this.csh.bind(this);
    }
    csh() {
        this.props.csh();
    }
    render() {
        const overlay = {
            'position': 'fixed', /* Sit on top of the page content */
            /* Hidden by default */
            'width': '100%', /* Full width (cover the whole page) */
            'height': '100%', /* Full height (cover the whole page) */
            'top': '10px',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'background-color': 'rgba(0,0,0,0.5)', /* Black background with opacity */
            'z-index': '2', /* Specify a stack order in case you're using a different order for other elements */
            'cursor': 'pointer' /* Add a pointer on hover */
        }
        const m = {
            'position': 'relative',
            'top': '5%',
            'left': '0',
            'right': '0',
            'bottom': '0',
        }
        const cs = {
            'position': 'relative',
            'top': '0',
            'left': '-65%',
            'right': '0',
            'bottom': '0',
        }
        return (
            <div style={overlay}>
                <Modal.Dialog style={m}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Your total bill is:{this.props.total}</h4>
                        <Form >
                            <App />

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.csh} style={cs}>Continue Shopping </Button>

                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
// <Form.Group controlId="formBasicName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="name" placeholder="Enter name" name="name"/>
//                 </Form.Group>

//                 <Form.Group controlId="formBasicCVC">
//                     <Form.Label>CVC</Form.Label>
//                     <Form.Control type="cvc" placeholder="Enter cvc" name="cvc"/>

//                 </Form.Group>

//                 <Form.Group controlId="formBasicDate">
//                     <Form.Label>Expiry Date</Form.Label>
//                     <Form.Control type="date" placeholder="Enter Expiry Date" name="date"/>
//                 </Form.Group>
//                 <App />
//                 <Button variant="primary" type="submit">
//                     Pay
//             </Button>
class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.showCart = this.showCart.bind(this);
        this.popupStateChange = this.popupStateChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.cartp = this.cartp.bind(this);
        this.state = {
            items: [],
            popup: true,
            productsInCart: [],
            role: 0
        };
    }
    cartp() {
        //console.log(s);
        $.get("/consumer/RProductsInCart", function (data) {
            this.setState({
                productsInCart: data
            });
            console.log("this.state.productsInCart")
            console.log(this.state.productsInCart)
            console.log("this.state.productsInCart")
        }.bind(this));
    }
    componentDidMount() {
        $.get("/consumer/GetUrole", function (data) {
            this.setState({
                role: data
            });
            ////////////////////

//////////////////////////////////////////////////////////////////
            // $(function () {
            //     console.log("started...");
            //     console.log(this.state.role);

            //     var hub = $.connection.echoHub;
            //     $.connection.logging = true;
            //     $.connection.url = "/realtime";
            //     hub.client.message = function (text) {
            //         $(".inner").append(text + "<br />");
            //     };
            //     if (this.state.role == 1) {
            //         document.cookie = "Username=admin";
            //     }
            //     if (this.state.role == 2) {
            //         document.cookie = "Username=vendor";
            //     }
            //     if (this.state.role == 3) {
            //         document.cookie = "Username=consumer";
            //     }
            //     if (this.state.role == 4) {
            //         document.cookie = "Username=guest";
            //     }
            //     $.connection.hub.start().done(function () {
            //         if (this.state.role == 3 || 4) {
            //             var text = this.state.role;
            //             hub.server.broadcast(text);
            //         }

            //     }.bind(this));
            // }.bind(this));
            //$("#sr").val();

        }.bind(this));


        try {
            this.cartp();
            $.get("/consumer/Getpro", function (data) {
                this.setState({
                    items: data
                });
            }.bind(this));
        }

        catch (e) {
            console.log("ajax get:" + e);
        }

    }
    showCart() {
        this.setState({
            popup: true
        })
    }
    popupStateChange(pstate) {
        this.setState({
            popup: pstate
        })
    }
    addToCart(productsInCart) {
        this.setState({
            productsInCart: productsInCart
        })
        //console.log(this.state.productsInCart)
    }
    render() {
        var rows = [];
        rows = this.state.items.map((item) => <Rows key={item.PRODUCT_ID} item={item} addToCart={this.addToCart} />)


        return (
            <div>
                {this.state.productsInCart.length != 0 && <Popup cartp={this.cartp} popupState={this.popupStateChange} productsInCart={this.state.productsInCart} />}
                <h1>SHOP</h1>
                <div class="inner">

                </div>
                <Table striped bordered hover variant="dark" >
                    <thead>
                        <tr>
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

ReactDOM.render(<ProductTable />, document.getElementById("root"));