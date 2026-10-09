const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());

const db = new sqlite3.Database(':memory:'); // Usamos memoria para pruebas rápidas
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

// 1. Healthcheck (Sugerido en la rúbrica)
app.get('/api/health', (req, res) => res.status(200).json({ status: "OK 3" }));

// 2. Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => res.status(200).json(rows));
});

// 3. Crear usuario
app.post('/api/users', (req, res) => {
    if (!req.body.name) return res.status(400).json({ error: "Falta nombre" });
    db.run("INSERT INTO users (name) VALUES (?)", [req.body.name], function() {
        res.status(201).json({ id: this.lastID, name: req.body.name });
    });
});

// 4. Obtener usuario por ID
app.get('/api/users/:id', (req, res) => {
    db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, row) => {
        if (!row) return res.status(404).json({ error: "No encontrado" });
        res.status(200).json(row);
    });
});

// 5. Actualizar usuario
app.put('/api/users/:id', (req, res) => {
    if (!req.body.name) return res.status(400).json({ error: "Falta nombre" });
    db.run("UPDATE users SET name = ? WHERE id = ?", [req.body.name, req.params.id], function() {
        res.status(200).json({ message: "Actualizado" });
    });
});

// 6. Eliminar usuario
app.delete('/api/users/:id', (req, res) => {
    db.run("DELETE FROM users WHERE id = ?", [req.params.id], function() {
        res.status(200).json({ message: "Eliminado" });
    });
});

if (require.main === module) {
    app.listen(80, () => console.log('API ya está corriendo en puerto 80'));
}
module.exports = app;