
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor de universidades funcionando correctamente');
});

// Ruta para consultar universidades
app.get('/api/universidades', async (req, res) => {
    try {
        const response = await axios.get(
            'http://universities.hipolabs.com/search?country=Peru'
        );

        res.json({
            success: true,
            total: response.data.length,
            data: response.data
        });

    } catch (error) {
        console.error('Error:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error al consultar las universidades'
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
