const User = require("../../models/Authentication/User-schema");

exports.signup_post = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.send(`
        <h1>Username already exists</h1>
        <p><a href='/sub-pages/user/signup.html'>Try again</a></p>
      `);
    }

    // 🆕 Create new user
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      userId: Math.random().toString().substr(2, 6),
    });

    await newUser.save();

    // ✅ Proper response
    return res.send(`
      <h1>Account Successfully Created</h1>
      <p><a href='/sub-pages/user/login.html'>Please Login</a></p>
    `);

  } catch (err) {
    console.log(err);
    return res.send(`
      <h1>Signup Failed</h1>
      <p><a href='/sub-pages/user/signup.html'>Try again</a></p>
    `);
  }
};