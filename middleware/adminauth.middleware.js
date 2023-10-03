const jwt = require("jsonwebtoken");


const adminauth = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  // const token = req.header("Authorization"); 
  console.log(token)
  if (!token) {
    return res.status(401).send({ msg: "Token not provided" });
  }

  jwt.verify(token, "pepe", (err, decoded) => {
    if (err) {
        console.log(err)
      return res.status(401).send({ msg: "Invalid token" });
    }
    req.userId = decoded.userId; 
    next(); 
  });
};

module.exports = adminauth;

