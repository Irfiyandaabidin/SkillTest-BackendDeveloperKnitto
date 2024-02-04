const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if(!bearerToken) {
    return res.status(401).json({
      message: 'You dont have token JWT',
      error: true,
      statusCode: 401
    })
  }
  try {
    const token = bearerToken.split('Bearer ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Authorization denied!',
      error: true,
      statusCode: 401
    })
  }
}