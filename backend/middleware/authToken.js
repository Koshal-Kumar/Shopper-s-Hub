import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY ;

//  const authTokenMiddleware = (req, res, next) =>{
//     try{
//         const  token = req.headers.authorization.split(' ')[1];
//         console.log(req.headers.authorization + token);
//         const decoded = jwt.verify(token,secretKey)
//         req.user = decoded;
//         next();
//     }
//     catch(err){
//         console.log(err)
//         res.status(403).send("error occured")
//     }
// }

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader+"authHeader");
    if (!authHeader) {
      console.log('Authorization header missing');
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing',
      });
    }
   
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token missing');
      return res.status(401).json({
        success: false,
        message: 'Token missing',
      });
    }
   
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      console.log(decoded)
      next();
    } catch (error) {
      console.log('Invalid token:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        error,
      });
    }
  };


export default authTokenMiddleware

