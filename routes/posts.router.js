const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts.controller.js')

router.get('/', postController.getAll)
router.get('/:id', postController.getById)
router.post('/', postController.create)
router.put('/:id', postController.update)
router.delete('/:id', postController.delete)

module.exports = router