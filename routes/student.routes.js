const router = require('express').Router();
const studentController = require('../controllers/user.controller')

router.get('/', studentController.create);
router.post('/insert', studentController.insert);
router.get('/list', studentController.list);
router.get('/edit/:id', studentController.edit);
router.post('/update', studentController.update);
router.get('/delete/:id', studentController.softDelete);

module.exports = router;