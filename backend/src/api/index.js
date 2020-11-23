const router = require('express').Router();
const authRouter = require('./auth');
const attenderRouter = require('./attender');

router.use('/auth', authRouter); // Authentication
router.use('/attender', attenderRouter);

module.exports = router;
