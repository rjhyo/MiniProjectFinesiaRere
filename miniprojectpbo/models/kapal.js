const db = require('../config/db');
const WebSocket = require('ws');

const getAllKapal = (callback) => {
  db.query('SELECT * FROM kapal', callback);
};

const getKapalById = (id, callback) => {
  db.query('SELECT * FROM kapal WHERE id_kapal = ?', [id], callback);
};

const createKapal = (data, callback) => {
  db.query('INSERT INTO kapal (nama_kapal, jenis_kapal, kapasitas_muatan) VALUES (?, ?, ?)', [data.nama_kapal, data.jenis_kapal, data.kapasitas_muatan], callback);
};

const updateKapal = (id, data, callback) => {
  db.query('UPDATE kapal SET nama_kapal = ?, jenis_kapal = ?, kapasitas_muatan = ? WHERE id_kapal = ?', [data.nama_kapal, data.jenis_kapal, data.kapasitas_muatan, id], callback);
};

const deleteKapal = (id, callback) => {
  db.query('DELETE FROM kapal WHERE id_kapal = ?', [id], callback);
};

module.exports = { getAllKapal, getKapalById, createKapal, updateKapal, deleteKapal };
