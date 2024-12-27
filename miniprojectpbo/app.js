const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const http = require('http');
const WebSocket = require("ws");
require("dotenv").config();

// Middleware untuk menerima request body dalam format JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Menyajikan file statis

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kapal_nelayan"
});

// Membuat server HTTP
const server = http.createServer(app);

// Membuat WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket: Mengirim pesan ke semua client yang terhubung
wss.on('connection', (ws) => {
    console.log('Client terhubung ke WebSocket');

    ws.on('message', (message) => {
        console.log(`Pesan diterima: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client terputus');
    });
});


// Endpoint untuk mendapatkan semua data kapal
app.get("/kapal", (req, res) => {
  db.query("SELECT * FROM kapal", (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(result);
  });
});

// Endpoint untuk menambah kapal (hanya admin)
app.post("/kapal", (req, res) => {
  const { nama_kapal, jenis_kapal, kapasitas_muatan } = req.body;
  db.query("INSERT INTO kapal (nama_kapal, jenis_kapal, kapasitas_muatan) VALUES (?, ?, ?)", [nama_kapal, jenis_kapal, kapasitas_muatan], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Kapal berhasil ditambahkan" });
  });
});

// Endpoint untuk login (menghasilkan token JWT)
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  // Validasi username dan password dari database (gunakan bcrypt untuk validasi password)
  // Misalnya, jika berhasil login:
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Jalankan server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
