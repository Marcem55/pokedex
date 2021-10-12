const { Router } = require('express');
const { getTypes } = require('../controllers/typeControllers/getTypes');

const router = Router();

router.get('/', getTypes);

module.exports = router;
