var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = "lerflrdnslnlkfcjJiugivjhB5962650dlkjk88";

module.exports = {
    generateTokenForUser : function(userData){
        return jwt.sign({
            utilisateursId: userData.id,
            permission: userData.permission
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '24h'
        })
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization){
      var utilisateursId = -1;
      var token = module.exports.parseAuthorization(authorization);
      if(token != null){
        try {
          var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
          if(jwtToken != null)
            utilisateursId = jwtToken.utilisateursId;
        } catch(err) {}
      }
      return utilisateursId;
    }
}

