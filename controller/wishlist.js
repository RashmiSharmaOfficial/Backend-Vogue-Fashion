const wishlistTable = require("../model/wishlist");


//to fetch all the wishlists
const all_Wishlist = (req, res) => {
    wishlistTable.findAll({raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

//to fetch wishlists by uniqueId of each user
const wishlist_UniqueId = (req, res) => {
    wishlistTable.findAll({
        where: {uniqueId: req.params.uniqueId}, raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}


//to insert wishlist in db
const post_Wishlist = (req, res) => {
    var uniqueId = req.body.uniqueId;
    var uniqueEmail = req.body.uniqueEmail;
    var img = req.body.img;
    var name = req.body.name;
    var price = req.body.price;
    var qty = req.body.qty;

    var wishlistObj = wishlistTable.build({uniqueId: uniqueId, uniqueEmail: uniqueEmail, img: img, name: name, price: price, qty: qty});

    wishlistObj.save().then( data => {
        var strMsg = "Record inserted successfully!"
        res.status(201).send(strMsg);
    }).catch((err) => {
        console.log("error ", err);
        res.status(400).send(err);
    })
}

//to delete wishlist from db
const delete_Wishlist = (req, res) => {
    var id = req.params.Id;
    console.log("Id to be deleted ", id);

    wishlistTable.destroy({where: {productId: id}}).then((data) => {
        console.log(data);
        var strMsg = "Record deleted successfully!"
        res.status(200).send(strMsg);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}


module.exports = {
    all_Wishlist,
    post_Wishlist,
    wishlist_UniqueId,
    delete_Wishlist
}