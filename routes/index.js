const router = require('express').Router();
const thougthRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api', thougthRoutes, userRoutes);

router.use((req, res) => res.status(404).send('404 Error!'));

module.exports = router;
