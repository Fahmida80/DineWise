import User from "../models/User.js"
import jwt from "jsonwebtoken";

const createToken = (_id, role) => {
    return jwt.sign({ _id, role}, process.env.SECRET, { expiresIn: "3d" });
}
//login user

const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    // Create a token
    const token = createToken(user._id, user.role);

    res.status(200).json({email, token})

} catch (error) {
    res.status(400).json({ error: error.message });
 }

}
//register user

const registerUser = async(req, res) => {
  const { email, password, role = 'customer'} = req.body;

  try {
    const user = await User.signup(email, password, role);

    // Create a token
    const token = createToken(user._id, role);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error message if something goes wrong
  }
};


export { loginUser, registerUser, getAllUsers };