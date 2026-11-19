
import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const [universidades, setUniversidades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {

        fetch('/api/universidades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al consultar el servidor');
                }

                return response.json();
            })
            .then(resultado => {
                setUniversidades(resultado.data);
                setCargando(false);
            })
            .catch(error => {
                setError(error.message);
                setCargando(false);
            });

    }, []);

    // Filtrar universidades en tiempo real
    const universidadesFiltradas = universidades.filter(
        universidad =>
            universidad.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container">

            <h1>Universidades del Perú</h1>

            <input
                type="text"
                placeholder="Buscar universidad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search"
            />

            <p className="total">
                Resultados encontrados: {universidadesFiltradas.length}
            </p>

            {cargando && <p>Cargando universidades...</p>}

            {error && <p>{error}</p>}

            <div className="grid">

                {universidadesFiltradas.map((universidad, index) => (
                    <div className="card" key={index}>

                        <h3>{universidad.name}</h3>

                        <p>
                            <strong>País:</strong> {universidad.country}
                        </p>

                        <p>
                            <strong>Dominio:</strong>{' '}
                            {universidad.domains.join(', ')}
                        </p>

                        <a
                            href={universidad.web_pages[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visitar página web
                        </a>

                    </div>
                ))}

            </div>

            {universidadesFiltradas.length === 0 && !cargando && !error && (
                <p>No se encontraron universidades.</p>
            )}

        </div>
    );
}

export default App;

