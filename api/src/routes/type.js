const { Router } = require('express');
const { getByType } = require('../controllers/typesControllers');

const router = Router();

router.get('/', getByType);

module.exports = router;
