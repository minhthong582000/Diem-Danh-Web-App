const router = require('express').Router();
const attenderCtl = require('./attender.controller');
const { checkPermission } = require('../auth/auth.permission');
const { validateCheckInOut } = require('./attender.validate');
const auth = require('../auth/passport.strategy')();

router.use(auth.authenticate);

/**
 * -------------- FOR ADMIN ----------------
 */
router.get('/count', checkPermission(['admin']), attenderCtl.countAttenders);
router.get('/', checkPermission(['admin']), attenderCtl.getAll);
router.get('/export', checkPermission(['admin']), attenderCtl.exportXLSX);

router.post(
    '/',
    checkPermission(['admin']),
    validateCheckInOut,
    attenderCtl.checkin,
);
router.post('/generate', checkPermission(['admin']), attenderCtl.seedQRCode);

router.delete('/', checkPermission(['admin']), attenderCtl.deleteAll);

module.exports = router;
