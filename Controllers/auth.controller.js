// controllers/auth.controller.js
// import User from "../models/User.js";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// this is a login pages 
// export const login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user){
//      return res.status(400).json({
//      msg: "User not found"
//      });
// }
//   const isMatch = await bcrypt.compare(req.body.password, user.password);
//   if (!isMatch){ 
//     return res.status(400).json({
//        msg: "Invalid credentials"
//        });
// }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// };


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
