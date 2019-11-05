const path = require("path");

module.exports = {
    entry: {
        index: "./Scripts/src/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "vendor.js"
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: /node_modules/ //excludes node_modules folder from being transpiled by babel. We do this because it's a waste of resources to do so.
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
//index
//adminAllUsers
//admminAllProducts
//adminAllVendors
//vendorDeleteProduct
//vendorEditProduct
//vendorAddProduct
//accountRegister
//accountLogin