import React from 'react';
import ReactDOM from 'react-dom';
// import 'react-dropzone-uploader/dist/styles.css';
// import Dropzone from 'react-dropzone-uploader'
import Select from 'react-select';


const MyUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'http://localhost:50918/Vendor/RAddProductImage' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        //s fileWithMeta.restart();
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            autoUpload={false}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/*,audio/*,video/*"
            submitButtonDisabled={false}
        />
    )
}






class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddProduct = this.handleAddProduct.bind(this);

        this.state = {
            categories: [],
            submit: false,
            meta: {}
        };
    }

    handleAddProduct(e) {
        e.preventDefault();
        const product = [];
        product.NAME = e.target.elements.Name.value.trim();
        product.DESCRIPTION = e.target.elements.Description.value.trim();
        product.PRICE = parseInt(e.target.elements.Price.value.trim());
        product.IMAGE_URL = e.target.elements.Image.value.trim();
        product.CATEGORY = parseInt(e.target.elements.Category.value);

        if (isNaN(product.PRICE)) {
            product.PRICE = 0;
        }

        if (isNaN(product.CATEGORY)) {
            product.CATEGORY = 1;
        }
        var datas = {
            NAME: product.NAME,
            DESCRIPTION: product.DESCRIPTION,
            PRICE: product.PRICE,
            IMAGE_URL: product.IMAGE_URL,
            CATEGORY: product.CATEGORY
        };
        var data = new FormData(document.querySelector('form'));
        var imagedata = e.target.elements.ImageFile.files[0];
        console.log(e.target.elements);
        console.log(imagedata);
        //data.append("p",datas)
        //data.append("data", imagedata);
        console.log(data)
        // $.ajax({
        //     type: "POST",
        //     contentType: 'multipart/form-data',
        //     url: '/Vendor/RAddProductImage',
        //     ProceData: false,
        //     data: data
        // })
        console.log(product);
        $.ajax({
            url: '/Vendor/RAddProductImage',
            type: 'POST',
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
              console.log(result)
              window.location.href = "/Vendor/";
            }
          })

        // $.post("/Vendor/RAddProductImage", { data }, function (data, status) {
        //     console.log("Data: " + data + "\nStatus: " + status);
        //     // window.location.href = "/Vendor/";
        // });
        
        // $.post("/Vendor/RAddProduct", { name: product.NAME, description: product.DESCRIPTION, price: product.PRICE, image: product.IMAGE_URL, category: product.CATEGORY, comp: true }, function (data, status) {
        //     console.log("Data: " + data + "\nStatus: " + status);
        //     // window.location.href = "/Vendor/";
        // });


    }

    componentDidMount() {
        try {
            $.get(this.props.dataUrl, function (data) {
                this.setState({
                    categories: data
                });
            }.bind(this));
        }
        catch (e) {
            console.log("ajax get:" + e);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleAddProduct} enctype="multipart/form-data">
                    <input type="text" placeholder="Enter Name" name="Name"></input>
                    <br />
                    <input type="text" placeholder="Enter Description" name="Description"></input><br />
                    <input type="text" placeholder="Enter Price" name="Price"></input><br />
                    <input type="text" placeholder="Enter Image" name="Image"></input><br />
                    <Select placeholder="--Select Category--" name="Category" options={this.state.categories} /><br />
                    <input type="file" name="ImageFile" />
                    <button >submit</button>
                </form>
                
            </div>
        );
    }
}

//ReactDOM.render(<AddProduct dataUrl="/Vendor/GETcategories" />, document.getElementById("root"));
ReactDOM.render(<AddProduct dataUrl="/Vendor/GETcategories" />, document.getElementById("root"));
