const jwt = require('jsonwebtoken');
const redisClient = require('../utilities/redis').redisClient;

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = async (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return await setToken(token, id)
    .then(() => {
      return { success: 'true', userId: id, token, user }
    })
    .catch(console.log);
};

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    console.log(authorization)
    return redisClient.get(authorization, (err, reply) => {
      if (err || !reply) {
        return res.status(401).send('Unauthorized');
      }
      return res.json({id: reply})
    });
  }

module.exports = {
    createSession: createSession,
    signToken: signToken,
    getAuthTokenId: getAuthTokenId,
    setToken: setToken
  }