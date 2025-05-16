const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuração inicial
const app = express();
const PORT = 3000;
const dbPath = path.resolve(__dirname, 'vinhos.db');

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite');
    db.run(`CREATE TABLE IF NOT EXISTS vinhedos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipoUva TEXT NOT NULL,
      dataPlantio TEXT NOT NULL,
      umidadeRelativa REAL NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      imagemPath TEXT DEFAULT 'default-vineyard.jpg',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Erro ao criar tabela:', err.message);
    });
  }
});

// Rotas
app.post('/vinhos/vinhedos', (req, res) => {
  const { tipoUva, dataPlantio, umidadeRelativa, geolocalizacao } = req.body;
  
  console.log('Dados recebidos:', req.body);

  // Validação
  if (!tipoUva || !dataPlantio || !umidadeRelativa || !geolocalizacao?.latitude || !geolocalizacao?.longitude) {
    return res.status(400).json({ 
      error: 'Dados incompletos',
      required: {
        tipoUva: 'string',
        dataPlantio: 'string (AAAA-MM-DD)',
        umidadeRelativa: 'number',
        geolocalizacao: {
          latitude: 'number',
          longitude: 'number'
        }
      }
    });
  }

  db.run(
    `INSERT INTO vinhedos (tipoUva, dataPlantio, umidadeRelativa, latitude, longitude) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      tipoUva.toString(),
      dataPlantio.toString(),
      parseFloat(umidadeRelativa),
      parseFloat(geolocalizacao.latitude),
      parseFloat(geolocalizacao.longitude)
    ],
    function(err) {
      if (err) {
        console.error('Erro no banco de dados:', err);
        return res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
      }
      res.status(201).json({ 
        success: true,
        id: this.lastID,
        message: 'Vinhedo cadastrado com sucesso'
      });
    }
  );
});

app.get('/vinhos/vinhedos', (req, res) => {
  db.all('SELECT * FROM vinhedos', [], (err, rows) => { // Removido ORDER BY createdAt
    if (err) {
      console.error('Erro ao buscar vinhedos:', err);
      return res.status(500).json({ error: 'Erro ao consultar banco de dados' });
    }
    res.json(rows);
  });
});

app.delete('/vinhos/vinhedos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.run('DELETE FROM vinhedos WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Erro ao deletar:', err);
      return res.status(500).json({ error: 'Erro ao deletar registro' });
    }
    res.json({ 
      success: true,
      message: `Vinhedo ${id} removido`,
      changes: this.changes
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Testar API: http://localhost:${PORT}/vinhos/vinhedos`);
});