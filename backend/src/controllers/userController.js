import User from "../models/User.js"
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: "3d" });
}
//login user

const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    // Create a token
    const token = createToken(user._id);

    res.status(200).json({email, token})

} catch (error) {
    res.status(400).json({ error: error.message });
 }

}
//register user

const registerUser = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

export { loginUser, registerUser };