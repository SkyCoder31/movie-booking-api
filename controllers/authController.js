const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Helper function to generate a token ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will expire in 30 days
  });
};

// --- @desc    Register a new user ---
// --- @route   POST /api/auth/register ---
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await db('users').where({ email }).first();
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const [newUser] = await db('users')
      .insert({
        name,
        email,
        password_hash,
      })
      .returning(['id', 'name', 'email']);

    // 4. Send back user data and a token
    res.status(201).json({
      ...newUser,
      token: generateToken(newUser.id),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// --- @desc    Authenticate (login) a user ---
// --- @route   POST /api/auth/login ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await db('users').where({ email }).first();

    // 2. If user exists, compare passwords
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      // 3. Passwords match! Send back user data and a token
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      // 4. No user or password doesn't match
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};