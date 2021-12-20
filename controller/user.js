const usersTable = require("../model/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'some super secret....'

const all_Users = (req, res) => {
    usersTable.findAll({raw: true}).then((data) => {
        console.log(data);
        res.status(200).send(data);
    }).catch((err) => {
        console.error("error ", err);
        res.status(400).send(err);
    })
}

const insert_Users = (req, res) => {
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userSalutation = req.body.userSalutation;
    var userDob = req.body.userDob;

    var userObj = usersTable.build({userName: userName, userEmail: userEmail, userPassword: userPassword, userSalutation: userSalutation, userDob: userDob});

    userObj.save().then( data => {
        var strMsg = "Record inserted successfully!"
        res.status(201).send(strMsg);
    }).catch((err) => {
        console.log("error ", err);
        res.status(400).send(err);
    })
}

const send_Email = (req, res) => {
    let user = req.body;

    sendMail(user, info => {
        console.log(`The mail has been said to ${info.messageId}`);
        res.send(info);
    })
}

async function sendMail(user, callback){
    // create reusable transporter 
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth:{
            user: "rashmisharmaofficial19019@gmail.com",
            pass: "BHYTFCVG*@#&0511"
        }
    }) 

    let mailOptions = {
    from: '"Vogue Fashions"',
    to: user.userEmail,
    subject: "Welcome to Vogue Fashions",
    html: `
        <h2>Hi ${user.userName},</h2> 
        <br>
        <h3>We welcome you to Vogue Fashions.</h3>
        
        <img src="https://sslimages.shoppersstop.com/sys-master/root/hbf/hfd/26662326337566/PVT-Fest-Carousal-Kids-Web_20211208.jpg" alt=""  alt="" style="height: 250px; width: 680px; aspect-ratio:auto 680/250">

        <h3>Features you unlocked! </h3>
        <hr>

        <p>1) Save your favourites across devices</p>
        <p>2) Save time at checkout for future orders</p>
        <p>2) Manage your purchases and returns in your order history</p>
        <p>4) Become a <span style="text-decoration: underline;">
            VOGUE FASHION EXPERIENCE</span> member to profit from special offers</p>

        <br>
        Thanks for joining us!
        <br>
        <br>

        With regards,
        <br>

        Vogue Fashions
        ` 
    }

    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

const renderforgot_Password = (req, res, next) => {
    res.render('forgotPassword')
}


const setForgot_Password = (req, res, next) => {
    const {email} = req.body;

    //make sure that email exists in db
    usersTable.findOne({
        where: {userEmail: email}, raw: true}).then((data) => {
            if(data == null){
                res.send("User not registered!");
                return;
            }

            //if user exists create one time token
            const secret = JWT_SECRET + data.userPassword;
            const payload = {
                email: data.userEmail,
                id: data.userId
            }

            const token = jwt.sign(payload, secret, {expiresIn: '15m'});
            const link = `http://localhost:8000/resetPassword/${data.userId}/${token}`;
            console.log(link);

            sendMail(data, info => {
                console.log(`The mail has been said to ${info.messageId}`);
                // res.send(info);
            })

            async function sendMail(data, callback){
                // create reusable transporter 
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    port: 587,
                    secure: false,
                    auth:{
                        user: "rashmisharmaofficial19019@gmail.com",
                        pass: "BHYTFCVG*@#&0511"
                    }
                }) 

                let mailOptions = {
                    from: '"Vogue Fashions"',
                    to: data.userEmail,
                    subject: "Reset Your Account Password",
                    html: `
                    <h3>Hi ${data.userName},</h3> <br>
                    We received a request to reset your Vogue Fashion password. Please click on the link below to update your password.
                    <br><br>

                    <a href="http://localhost:8000/resetPassword/${data.userId}/${token}" type="button">Reset Password</a>
                    

                    <br><br>
                    <h5>Please ignore this email if you do not wish to reset your password. If you did not request a password reset, please let us know.</h5>

                    `
                }

                let info = await transporter.sendMail(mailOptions);
                callback(info);
            }
            
            

            res.send("Password link has been sent to you")

    }).catch((err) => {
        console.error("error ", err);
    })

}

const renderReset_Password = (req, res, next) => {
    const {id, token} = req.params;

    // check if this id exists in the db
    usersTable.findOne({where: {userId: id}, raw: true}).then((data) => {
        if(data == null){
            res.send("Invalid id...");
            return;
        }
        //we have a valid user here
        const secret = JWT_SECRET + data.userPassword;
        try {
            const payload = jwt.verify(token, secret);
            res.render('resetPassword', {email: data.userEmail});
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    // res.send(req.params);

    })
}

const setReset_Password = (req, res, next) => {
    const {id, token} = req.params;
    const {password1, password2} = req.body;

    usersTable.findOne({where: {userId: id}, raw: true}).then((data) => {
        if(data == null){
           res.send("Invalid id...");
           return; 
        }
        const secret = JWT_SECRET + data.userPassword;
        try {
            const payload = jwt.verify(token, secret);
            data.userPassword = password1;

            usersTable.update({userPassword: password1}, {where: {userId: id}}).then((data) => {
                var strMsg = "Record updated successfully!!";
                console.log(strMsg);
                // alert("Password reset successfully!")
                res.writeHead(302, {
                    Location: 'http://localhost:4200/login'
                });
                res.end();

            }).catch((err) => {
                console.error("error ", err);
            })
            return
         } catch (error) {
            console.log(error.message);
            return
        }
    })
}



module.exports = {
    all_Users,
    insert_Users,
    send_Email,
    renderforgot_Password,
    setForgot_Password,
    renderReset_Password,
    setReset_Password
}