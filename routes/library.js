const router = require('express').Router();
const Controller = require('../controller/controller');

router.get('/books', Controller.showBook);
router.post('/books', Controller.createBook);
router.put('/books/:id', Controller.updateBook);
router.delete('/books/:id', Controller.deleteBook);
router.put('/books', Controller.findAndUpdateBook);

module.exports = router