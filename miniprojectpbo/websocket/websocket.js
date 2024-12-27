const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client terhubung ke WebSocket');

    ws.on('message', (message) => {
        console.log(`Pesan diterima: ${message}`);
        
        // Kirim kembali ke semua client
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client terputus');
    });

    
});

server.listen(3000, () => {
    console.log('WebSocket server berjalan di http://localhost:3000');
});
