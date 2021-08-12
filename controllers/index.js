const router = require('express').Router();

const apiRoutes = require('./api');
const profileRoutes = require('./profile-routes')
const homeRoutes = require('./homeroutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes)

module.exports = router;