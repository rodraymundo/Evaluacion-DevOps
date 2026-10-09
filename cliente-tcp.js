const net = require('net');

// Cambia esta IP por tu IP pública de AWS
const HOST = '3.134.112.1'; 
const PORT = 6061;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Conectado al servidor TCP en AWS');
    
    // Descomenta la prueba que quieras ejecutar y tomar captura:

     //Prueba 1: Insertar elemento
    const comandoInsert = '{insert:{"name":"Raymundo"}}';
    console.log('Enviando:', comandoInsert);
    client.write(comandoInsert + '\n');

   
    
});

client.on('data', (data) => {
    console.log('Respuesta del servidor:', data.toString());
    client.destroy(); // Cierra la conexión después de recibir respuesta
});

client.on('error', (err) => {
    console.error('Error de conexión:', err.message);
});