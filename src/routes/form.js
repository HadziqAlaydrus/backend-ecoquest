const express = require('express');
const router = express.Router();

const {
    getPickUp,
    createForm,
    deletedFormById,
    getFormById,
} = require('../controllers/form');

router.get('/pickup', getPickUp);
router.post('/pickup', createForm);
router.delete('/pickup/:id', deletedFormById);
router.get('/pickup/:id', getFormById)


module.exports = router; // Pastikan ini diekspor dengan benar
