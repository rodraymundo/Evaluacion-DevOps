const request = require('supertest');
const app = require('./index');

describe('Pruebas de Integración API REST', () => {
    test('1. GET /api/health', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
    });
    test('2. POST /api/users - Éxito', async () => {
        const res = await request(app).post('/api/users').send({ name: 'Raymundo' });
        expect(res.statusCode).toBe(201);
    });
    test('3. POST /api/users - Fallo por falta de nombre', async () => {
        const res = await request(app).post('/api/users').send({});
        expect(res.statusCode).toBe(400);
    });
    test('4. GET /api/users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
    });
    test('5. GET /api/users/:id - Éxito', async () => {
        const res = await request(app).get('/api/users/1');
        expect(res.statusCode).toBe(200);
    });
    test('6. GET /api/users/:id - No encontrado', async () => {
        const res = await request(app).get('/api/users/999');
        expect(res.statusCode).toBe(404);
    });
    test('7. PUT /api/users/:id', async () => {
        const res = await request(app).put('/api/users/1').send({ name: 'Raymundo Editado' });
        expect(res.statusCode).toBe(200);
    });
    test('8. DELETE /api/users/:id', async () => {
        const res = await request(app).delete('/api/users/1');
        expect(res.statusCode).toBe(200);
    });
});