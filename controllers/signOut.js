const redisClient = require('../utilities/redis').redisClient;

const signOut = (req, res) => {
    const { authorization } = req.headers;
    redisClient.del(authorization, (err, reply) => {
        if (err || !reply) {
          return res.status(401).send('Unauthorized');
        }
        return res.status(200).send('Signed Out');;
    })
};

module.exports = {
    signOut: signOut
  };