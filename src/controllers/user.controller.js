import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, address, phone, citizenshipId, drivingLicense } = req.body;

  try {
    if (!(username || email || password || firstName || lastName || address || phone || citizenshipId || drivingLicense)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phone,
      citizenshipId,
      drivingLicense,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

