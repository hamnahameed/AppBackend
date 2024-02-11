const userModel = require("../model/userScehema");
const bcrypt = require("bcryptjs");
const jwt = require("../middlewares/jwtMiddleware")


exports.signUp = async (req, res) => {
  try {
    const { username,email, password, role, address, latitude, longitude } = req.body;
    
    // Check for missing fields
    if (!username || !email || !role || !password ) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }

    // if user already exist
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(400).json({
        message: "User already exist !!..",
      });
      return;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashpwd = await bcrypt.hashSync(password, salt);
  

    // Create user
    const user = new userModel({
      username,
      email,
      role,
      password: hashpwd,
      address,
      latitude,
      longitude
    });

    await user.save();

    res.status(200).json({
      message: "User created successfully!",
      data: user,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    // find user
    const user = await userModel.findOne({ email });

    // Verify Password
    const verifyHash = await bcrypt.compareSync(password, user.password);
   if (!verifyHash) {
      res.status(400).json({ message: "Crendentials error" });
      return;
    }
    if (verifyHash) {
      const tokenObj = {
        userId:user._id,
      };
      const token = await jwt.sign(tokenObj);
      // User get
      res.status(200).json({
        message: "User login succesfully !!..",
        data: user,
        token,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong !!..",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
     const user = await userModel.findOne({_id:req.userId});
    res.status(200).json({
      message: "User retrieved succesfully !!..",
      data: user,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong !!..",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    
    const { username, password, address, latitude, longitude } = req.body;
    // If fields are missing
    if (!username || !password) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashpwd = await bcrypt.hashSync(password, salt);

    //update User
    const user = await userModel.findByIdAndUpdate(req.userId,{username,password:hashpwd,address, latitude, longitude},{new:true});
    res.status(200).json({
      message: "User updated succesfully !!..",
      data: user,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong !!..",
    });
  }
};