const cartTable = require("../model/cart");
const stripe = require("stripe")("sk_test_51K47o3SFYmCGvclxhK9HeNW47thwIrQAanq23m9SiptnEkU1dWQufdfg3MauhT5cTaTfZZNDqDZHWhQyCMCo8Fnq00HsU3v7av");


//to fetch all the cart items
const all_Cart = (req, res) => {
    cartTable.findAll({raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

//to fetch cart by uniqueId of each user
const cart_UniqueId = (req, res) => {
    cartTable.findAll({
        where: {uniqueId: req.params.uniqueId}, raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

//to insert cart in db
const post_Cart = (req, res) => {
    var productId = req.body.productId;
    var uniqueId = req.body.uniqueId;
    var uniqueEmail = req.body.uniqueEmail;
    var img = req.body.img;
    var name = req.body.name;
    var price = req.body.price;
    var qty = req.body.qty;

    var cartObj = cartTable.build({productId:productId, uniqueId: uniqueId, uniqueEmail: uniqueEmail, img: img, name: name, price: price, qty: qty});

    cartObj.save().then( data => {
        var strMsg = "Record inserted successfully!"
        res.status(201).send(strMsg);
    }).catch((err) => {
        console.log("error ", err);
        res.status(400).send(err);
    })
}

//update cart in db
const update_Cart = (req, res) => {
    var productId = req.body.productId
    var uniqueId = req.body.uniqueId;
    var uniqueEmail = req.body.uniqueEmail;
    var img = req.body.img;
    var name = req.body.name;
    var price = req.body.price;
    var qty = req.body.qty;

    cartTable.update({uniqueId: uniqueId, uniqueEmail: uniqueEmail, img: img, name: name, price: price, qty: qty},
        {where: {productId: productId}}).then((data) => {
        console.log(data);
        var strMsg = "Record updated successfully!!";
        res.status(201).send(strMsg);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

//to delete wishlist from db
const delete_Cart = (req, res) => {
    var id = req.params.Id;
    console.log("Id to be deleted ", id);

    cartTable.destroy({where: {productId: id}}).then((data) => {
        console.log(data);
        var strMsg = "Record deleted successfully!"
        res.status(200).send(strMsg);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

const delete_CartByUser = (req, res) => {
    var id = req.params.Id;
    console.log("Id to be deleted ", id);

    cartTable.destroy({where: {uniqueId: id}}).then((data) => {
        console.log(data);
        var strMsg = "Record deleted successfully!"
        res.status(200).send(strMsg);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}




module.exports = {
    all_Cart,
    post_Cart,
    update_Cart,
    cart_UniqueId,
    delete_Cart,
    delete_CartByUser
}