const express = require("express");
const cors = require("cors");
const userRoutes = require("./route/user");
const productRoutes = require("./route/products");
const wishlistRoutes = require("./route/wishlist");
const cartRoutes = require("./route/cart");
// const bodyParser = require('body-parser');
const stripe = require("stripe")('sk_test_51K47o3SFYmCGvclxhK9HeNW47thwIrQAanq23m9SiptnEkU1dWQufdfg3MauhT5cTaTfZZNDqDZHWhQyCMCo8Fnq00HsU3v7av');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use(bodyParser.urlencoded({ extended: false }));



app.use(userRoutes);
app.use(productRoutes);
app.use(wishlistRoutes);
app.use(cartRoutes);


app.post("/stripe", (req, res, next) => {
    stripe.charges.create({
        amount: req.body.amount *100,
        currency: 'INR',
        description: 'One time setup fee',
        source: req.body.token.id
    }, (err, charge) => {
        if(err){
            next(err);
        }
        res.json({success: true, status: "Payments Successful"})
    })
    console.log(req.body);
})


app.listen(8000, function(){
    console.log("server is listening at 8000 port");
})