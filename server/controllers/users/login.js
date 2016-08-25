import jwt from 'jsonwebtoken';

const social = (req, res) => {
  const userInfo = {
    name: req.user.name,
    username: req.user.username || 'jane',
    photo: req.user.photo,
    email: req.user.email,
    roles: req.user.roles,
    _id: req.user._id
  };

  const token = jwt.sign(userInfo, process.env.SECRET_KEY, {
    expiresIn: '90 days',
  });

  req.user = userInfo;

  // Return token and success message in JSON
  return res.redirect(`/?token=${token}`);
};

const local = (req, res) => {
  const userInfo = {
    name: req.user.name,
    username: req.user.username,
    photo: req.user.photo,
    email: req.user.email,
    roles: req.user.roles,
    _id: req.user._id
  };

  const token = jwt.sign(userInfo, process.env.SECRET_KEY, {
    expiresIn: '90 days',
  });

  userInfo.token = token;

  return res.json(userInfo);
};

export default { social, local };

