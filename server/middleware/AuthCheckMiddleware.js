const jwt = require('jsonwebtoken');  


module.exports = function (req, res, next){

  if (req.method === "OPTIONS") {
    next();
  }
  
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "пользователь не авторизован" });
    }
  
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer') {
      return res.status(401).json({ message: "пользователь не авторизован" });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "auth middleware check error: " + e });
  }

}