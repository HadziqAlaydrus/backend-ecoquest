const express = require('express');
const router = express.Router();

const {
    getPickUp,
    createForm,
    deletedFormById,
    getFormById,
    updateStatus,
} = require('../controllers/form');

router.get('/pickup', getPickUp);
router.post('/pickup', createForm);
router.delete('/pickup/:id', deletedFormById);
router.get('/pickup/:id', getFormById);
router.put('/pickup/:id/status',updateStatus);



module.exports = router; // Pastikan ini diekspor dengan benar
