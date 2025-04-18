const express=require("express");
const router=express.Router();
const {SendOTPVerificationEmail} = require("../controller/UserOTPController");
const UserOTPVerification = require("../models/UserOPT");

const {ApplicantInfoByName,PostInfoApplicant,getallApp,patchAccept,AcceptedCand} = require("../controller/ApplicantController");

const {getAllProduct,postProduct,checkLoginInfo}=require("../controller/productController");
const {patchCand}=require("../controller/productController");

router.post("/product",postProduct);
router.get("/product",getAllProduct);
router.get("/product/:email",checkLoginInfo);
router.get("/applicant/d/:email",ApplicantInfoByName);
router.post("/applicant",PostInfoApplicant);
router.patch("/:email",patchCand);
router.get("/applicant",getallApp);
router.patch('/accept/:email', patchAccept);
router.get("/accepted",AcceptedCand);

router.post('/product/otpverify/:mail', function(req, res) {
  const email = req.params.mail;
  SendOTPVerificationEmail({  email }, res);
});



 

module.exports=router;

