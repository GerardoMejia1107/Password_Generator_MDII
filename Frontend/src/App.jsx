

function App() {
    return (
        <main className="generator-program-container">
            <div className="container">
                <div className="config-section">
                    <h1>Generador de Contraseñas</h1>
                    <label htmlFor="length">Longitud:</label>
                    <input type="number" id="length" min="4" max="20"/>

                    <div className="options">
                        <label><input type="checkbox"/> Mayúsculas</label>
                        <label><input type="checkbox"/> Números</label>
                        <label><input type="checkbox"/> Símbolos</label>
                    </div>

                    <div className="button-group">
                        <button>Generar</button>
                        <button>Reiniciar</button>
                    </div>
                </div>

                <div className="result-section">
                    <h2>Contraseña Generada:</h2>
                    <input type="text" readOnly/>
                    <button>Copiar</button>

                    <div className="security-analysis">
                        <h3>Análisis de Seguridad</h3>
                        <div className="result-cards">
                            <div className="result-card">
                                <i className="fas fa-lock"></i>
                                <p>Combinaciones: <span>---</span></p>
                            </div>
                            <div className="result-card weak">
                                <i className="fas fa-exclamation-triangle"></i>
                                <p>Débil: <span>---</span></p>
                            </div>
                            <div className="result-card secure">
                                <i className="fas fa-shield-alt"></i>
                                <p>Segura: <span>---</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default App;
