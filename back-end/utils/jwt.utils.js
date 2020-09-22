var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = "lerflrdnslnlkfcjJiugivjhB5962650dlkjk88";

module.exports = {
    generateTokenForUser : function(userData){
        return jwt.sign({
            utilisateursId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}