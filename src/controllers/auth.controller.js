import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwr.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Register
export const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El usuario ya existe"]);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: passwordHash });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json("No existe ese usuario");

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json("Contraseña incorrecta");

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Verify Token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No hay token" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

// Profile
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "No existe ese usuario" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
