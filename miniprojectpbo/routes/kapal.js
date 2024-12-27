const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { getAllKapal, getKapalById, createKapal, updateKapal, deleteKapal } = require('../models/kapal');
const router = express.Router();

// CRUD Kapal
router.get('/kapal', verifyToken, (req, res) => {
  getAllKapal((err, result) => {
    if (err) return res.status(500).send('Error retrieving data');
    res.json(result);
  });
});

router.get('/kapal/:id', verifyToken, (req, res) => {
  getKapalById(req.params.id, (err, result) => {
    if (err) return res.status(500).send('Error retrieving data');
    res.json(result);
  });
});

router.post('/kapal', verifyToken, verifyAdmin, (req, res) => {
  const { nama_kapal, jenis_kapal, kapasitas_muatan } = req.body;
  createKapal({ nama_kapal, jenis_kapal, kapasitas_muatan }, (err, result) => {
    if (err) return res.status(500).send('Error creating kapal');
    res.json({ message: 'Kapal created successfully', id_kapal: result.insertId });
  });
});

router.put('/kapal/:id', verifyToken, verifyAdmin, (req, res) => {
  const { nama_kapal, jenis_kapal, kapasitas_muatan } = req.body;
  updateKapal(req.params.id, { nama_kapal, jenis_kapal, kapasitas_muatan }, (err, result) => {
    if (err) return res.status(500).send('Error updating kapal');
    res.json({ message: 'Kapal updated successfully' });
  });
});

router.delete('/kapal/:id', verifyToken, verifyAdmin, (req, res) => {
  deleteKapal(req.params.id, (err, result) => {
    if (err) return res.status(500).send('Error deleting kapal');
    res.json({ message: 'Kapal deleted successfully' });
  });
});

module.exports = router;
