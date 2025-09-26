const jwt = require("jsonwebtoken");
const UserData = require("./models/user.js");

const userAuth = async (req, res, next ) => {


    try{

        const {token} = req.cookies;
                 if(!token)
                    throw new Error ("Invalid token");
        
                const payload = jwt.verify(token,  "123456789Himanshu");
        
                const {_id} = payload;
        
                if(!_id){
                    throw new Error ("Id is missing");
                };

                 const result = await UserData.findById(_id);

                 if(!result){
                    throw new Error ("User doesn't exists");
                 };

                 req.result = result;

                 next();


    }catch(err){
        res.send(err.message + " error from userAuth middleware");
    }
}

module.exports = userAuth;