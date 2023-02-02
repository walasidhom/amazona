import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

//create a middleware to authenticate user
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    //get the token of the req
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    //decrypt this token (with verify which takes 3 params : token , jwtSecret key , callback function)
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' }); //401:client error, 
      } else {
        req.user = decode; //decode contains data (user info in our case)
        next(); //we pass user as prop to req to the next middleware
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
}