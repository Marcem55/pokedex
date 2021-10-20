const { Router } = require('express');
const { getAllTypes } = require('../controllers/typesControllers');

const router = Router();

router.get('/', async (req, res) => {
    try {
        let myTypes = await getAllTypes();
        return res.status(200).json(myTypes);
    } catch (error) {
        return res.status(400).send('Types not found');
    }
});

module.exports = router;