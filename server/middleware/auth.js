import jwt, { decode } from 'jsonwebtoken'

const auth = async (req, res, next) => {
   try {
    // check user token is valid 
    // console.log(req.headers);
     const token = req.headers?.authorization.split(" ")[1];
    // token length is < 500 ? it is custom login token : it is google login token
    const isCustomeAuth = token.length < 500;

    if( isCustomeAuth && token) {
        const decodeData = jwt.verify(token, 'test');
        // console.log(decodeData);
        req.userId = decodeData?.id;
        console.log(req.userId);
    } else {
        const decodeData = jwt.verify(token);
        req.userId = decodeData?.sub;
    }
    next();
     
   } catch (error) {
       console.log(error);
   }
}

export default auth;