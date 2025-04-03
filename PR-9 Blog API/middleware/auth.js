const JWT = require('jsonwebtoken');

const varifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        // console.log(token);

        if (!token) {
            return res.status(200).send({
                success: false,
                Message: "Token is Blank"
            })
        }
        let newToken = token.slice(7);
        // console.log(newToken);


        JWT.verify(newToken, 'user', (err, decode) => {
            if (err) {
                return res.status(200).send({
                    success: false,
                    Message: "Token is not Valid"
                })
            }
            req.user = decode.user;
            return next();
        })



    }
    catch (err) {
        return res.status(501).send({
            success: false,
            err: err
        })
    }
}
// Role Base Authentication
const authoriseRole = (role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {    // admin = user
             return res.status(400).send({
                success:false,
                Message :"Unauthorized Author"
             })
        }

        return next();  


    }
}



module.exports = {
    varifyToken, authoriseRole
}