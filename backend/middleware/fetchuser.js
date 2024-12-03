var jwt = require('jsonwebtoken');
const JWT_SECRET= "iamavinash";


const fetchuser= (req,res,next)=>{
    
    // Get the user from the jwt token and  add id to the request object
        
    const token= req.header('auth-token');
    if(!token){
        res.status(401).send({error:" Pls authenticate using a valid token"});
    }
         // in case if token is not valid we'll check for the error
         try {
             const data = jwt.verify(token,JWT_SECRET);
             req.user= data.user;
             next();
         } catch (error) {
             res.status(401).send({error:" Pls authenticate using a valid token"});

         }
}

module.exports = fetchuser;

