const express = require('express');
const { getExamples, createExample } = require('../controllers/exampleController');

const router = express.Router();

router.get('/', getExamples);
router.post('/', createExample);

module.exports = router;

/**
 * @swagger
 * /api/examples:
 *   get:
 *     description: Get all examples
 *     responses:
 *       200:
 *         description: Success
 */
