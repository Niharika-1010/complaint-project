const User = require("../../models/Authentication/User-schema");
const Token = require("../../jwt/token");

exports.login_post = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find only one user (FAST)
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.send(`
        <h1>User Not Found</h1>
        <h3><a href='/sub-pages/user/signup.html'>Sign up</a></h3>
      `);
    }

    // Check password
    if (user.password !== password) {
      return res.send("Invalid Password");
    }

    // Generate token
    const token = Token.tokenGenerator(user.username);

    // Store token in cookie
    res.cookie("jwt", token);

    // Redirect to dashboard
    return res.redirect(`/user/${user.userId}`);

  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};