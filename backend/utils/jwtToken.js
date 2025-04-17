export const GenerateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "AdminToken" : "PatientToken";
  res.status(statusCode).cookie(cookieName, token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
  }).json({
    success: true,
    message,
    token,
    user,
  });
};