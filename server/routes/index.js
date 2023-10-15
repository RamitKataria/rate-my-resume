const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.status(200).send({
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/user', requiresAuth(), function (req, res, next) {
  console.log(req.oidc.user);
  const user = req.oidc.user;
  res.status(200).send({
    picture: user.picture,
    name: "Placeholder Name"
  });
});

module.exports = router;
