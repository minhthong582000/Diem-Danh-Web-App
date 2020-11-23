const router = require('express').Router();
const authCtl = require('./auth.controller');
const { validateLogin } = require('./auth.validate');

router.post('/login/admin', validateLogin, authCtl.loginForAdmins);

module.exports = router;
