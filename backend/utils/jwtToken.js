// Create and send token also save token in cookie

const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    // jokhn cookie expire hoye jabe tokhn date extend kora hocche aro 24 hrs,60 min,60 sec,1000 milisec
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    // now this cookie is only accessable by http only. httpOnly: true na dile browser theke cookie access kora jabe javascript er maddhome.
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
