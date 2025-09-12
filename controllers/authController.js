const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const setAuthCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,       // HTTPS in produce
    sameSite: isProd ? 'none' : 'lax', // 'none' for cross-site
    maxAge: 24 * 60 * 60 * 1000
  });
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "All the fields should be filled in!" });

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ error: "This email/username is already registered." });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });

    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      message: "Successful sign-up",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password)
      return res.status(400).json({ error: "Missing data!" });

    const user = await User.findOne({
      $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername.toLowerCase() }],
    });
    if (!user) return res.status(401).json({ error: "Wrong credentials!" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Wrong credentials!" });

    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      message: "Successful login",
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ message: "Successful logout" });
};

exports.me = async (req, res) => {
  const user = req.user; // put by middleware
  res.json({ user: { id: user._id, username: user.username, email: user.email } });
};

