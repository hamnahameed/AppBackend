const express = require('express');
const router = express.Router();
const {signUp,login,getUser,updateUser} = require('../controllers/authControllers');
const jwt = require("../middlewares/jwtMiddleware")

router.post("/signup",signUp);
router.post("/login",login);
router.get("/getuser/:id",jwt.verifyToken,getUser);
router.put("/updateuser/:id",jwt.verifyToken,updateUser);

module.exports = router;