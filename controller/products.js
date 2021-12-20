const productTable = require("../model/products");

const all_Products = (req, res) => {
    productTable.findAll({raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

const post_Products = (req, res) =>{
    var gender = req.body.gender;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var price = req.body.price;
    var aprice = req.body.aprice;
    var dprice = req.body.dprice;
    var name = req.body.name;
    var categories = req.body.categories;
    var brand = req.body.brand;

    var productObj = productTable.build({
        gender: gender,
        img1: img1,
        img2: img2,
        price: price,
        aprice: aprice,
        dprice: dprice,
        name: name,
        categories: categories,
        brand: brand
    });

    productObj.save().then(data => {
        var strMsg = "Record inserted successfully!"
        res.status(201).send(strMsg);
    }).catch((err) => {
        console.log("error ", err);
        res.status(400).send(err);
    })

}

module.exports = {
    all_Products,
    post_Products
}