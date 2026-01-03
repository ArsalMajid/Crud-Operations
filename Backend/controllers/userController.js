import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Manual validation check to debug 400 errors
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required fields" });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    // If error.code is 11000, it's a duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ message: "This email is already in use" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};