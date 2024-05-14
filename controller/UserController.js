const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//* POST => Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  let errorMessage = "";

  if (!username || !password) {
    errorMessage = "Please provide username and password";
  } else if (password.length < 6) {
    errorMessage = "Password must be at least 6 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  let newUser = null;
  try {
    const foundUser = await User.findOne({ username }).exec();
    if (foundUser) {
      return res.status(400).send({
        error: "This user has already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating new User
    newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the user",
      description: error,
    });
  }

  const token = jwt.sign(
    {
      username,
      role: "user",
    },
    process.env.jwt_secret_key
  );

  res.status(201).send({
    message: "User created successfully",
    token,
    data: newUser
  });
};

//* POST => Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  let errorMessage = "";
  if (!username || !password) {
    errorMessage = "username and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            username,
            role: "user",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "User successfully authenticated",
          token,
          data: foundUser
        });
      });
    } else {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: err
    });
  }
};