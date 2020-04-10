const crypto = require('crypto');

module.exports.isAuth = async (user, password) => {
  if (!user) return false;

  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 512, 'sha512').toString('hex');
  return hash === user.hash;
};

module.exports.setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
  return { salt, hash };
};
