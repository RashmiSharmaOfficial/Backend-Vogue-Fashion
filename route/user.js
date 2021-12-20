const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.get("/allUsers", userController.all_Users);
router.post("/insertUsers", userController.insert_Users);
router.post("/sendEmail", userController.send_Email);

router.get("/forgotPassword", userController.renderforgot_Password);
router.post("/forgotPassword", userController.setForgot_Password);
router.get("/resetPassword/:id/:token", userController.renderReset_Password);
router.post("/resetPassword/:id/:token", userController.setReset_Password);


module.exports = router;