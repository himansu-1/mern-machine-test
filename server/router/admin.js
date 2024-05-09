const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const varifyAdmin = require('../middlewere/verifyAdmin')
const Admin = require("../module/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2IyMTQyMTZhODQ5NzkxYzlhMGNkYiIsIm5hbWUiOiJEaWJhIiwiaWF0IjoxNzE1MTUxMTcwfQ.gytdq8YTrqn4y6HHaKU7ag5cnHzHmsH-CjZ96lxvY7I

router.post(
  "/register",
  [
    body("name", "Enter a Valid Name").notEmpty().isLength({ min: 3 }),
    body("email", "Enter a Valid Email").notEmpty().isEmail(),
    body("password", "Enter a Valid Password").notEmpty().isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors });
    }

    try {
      const copy = await Admin.findOne({ email: req.body.email });
      if (copy) {
        return res
          .status(401)
          .json({ success: success, result: "Email already Exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      const authToken = jwt.sign(
        { id: admin.id, name: admin.name },
        process.env.JWT_SIGN
      );
      success = true;

      return res.status(201).json({ success: success, authToken: authToken });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").notEmpty().isEmail(),
    body("password", "Enter a Valid Password").notEmpty().isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: success, result: "Email already Exists" });
    }

    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: success, result: "Invalid Credentials" });
    }

    const authToken = jwt.sign(
      { id: admin.id, name: admin.name },
      process.env.JWT_SIGN
    );
    success = true;
    return res.status(201).json({ success: success, authToken: authToken });
  }
);

router.get(
  "/getAdmin",
  varifyAdmin,
  async (req, res)=>{
    const result = {id:req.id, name:req.name}
    return res.status(200).json({result})
  }
)

// router.get("/get", varifyAdmin, async (req, res) => {
//   try {
//     // const admin = await Admin.find({});

//     return res.json({id: req.id, name: req.name})

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
