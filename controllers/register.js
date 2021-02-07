const {createSession, getAuthTokenId, signToken} = require('../utilities/TokenUtils')

const registerAuthentication  = (db, bcrypt) => (req, res) => 
{
  const { email, name, password } = req.body;

  return handleSignin(req, res, db, bcrypt)
    .then(data =>
      (data.id && data.email) ? createSession(data) : res.status(400).json('Registration Failed'))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
}

const handleSignin = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);

  return db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => user[0])
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
  registerAuthentication: registerAuthentication
};