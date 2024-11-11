import { useState } from 'react';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [pool, setPool] = useState('');
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [combinations, setCombinations] = useState('---');
    const [weakProbability, setWeakProbability] = useState('---');
    const [secureProbability, setSecureProbability] = useState('---');

    const generatePassword = () => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_-+=<>?';

        let characters = lowercase;

        if (includeUppercase) {
            characters += uppercase;
        }
        if (includeNumbers) {
            characters += numbers;
        }
        if (includeSymbols) {
            characters += symbols;
        }

        if (!characters) {
            characters = lowercase;
        }

        setPool(characters);

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        setGeneratedPassword(password);

        // Calcular combinaciones después de generar la contraseña
        const result = getPermutations(characters.length, length);
        setCombinations(formatNumberWithCommas(result));
    };

    const resetInputs = () => {
        setLength(8);
        setIncludeUppercase(false);
        setIncludeNumbers(false);
        setIncludeSymbols(false);
        setGeneratedPassword('');
        setCombinations('---');
        setWeakProbability('---');
        setSecureProbability('---');
    };

    const copyToClipboard = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword);
            alert('Contraseña copiada al portapapeles');
        } else {
            alert('No hay contraseña generada para copiar');
        }
    };

    const factorial = (number) => {
        if (number === 0 || number === 1) {
            return 1;
        }
        return number * factorial(number - 1);
    };

    const getPermutations = (n, k) => {
        return factorial(n) / factorial(n - k);
    };

    const formatNumberWithCommas = (number) => {
        return number.toLocaleString();
    };

    return (
        <main className="generator-program-container">
            <div className="container">
                <div className="config-section">
                    <h1>Generador de Contraseñas</h1>
                    <label htmlFor="length">Longitud:</label>
                    <input
                        type="number"
                        id="length"
                        min="4"
                        max="20"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />

                    <div className="options">
                        <label><input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} /> Mayúsculas</label>
                        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Números</label>
                        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Símbolos</label>
                    </div>

                    <div className="button-group">
                        <button onClick={generatePassword}>Generar</button>
                        <button onClick={resetInputs}>Reiniciar</button>
                    </div>
                </div>

                <div className="result-section">
                    <h2>Contraseña Generada:</h2>
                    <input type="text" value={generatedPassword} readOnly />
                    <button onClick={copyToClipboard}>Copiar</button>

                    <div className="security-analysis">
                        <h3>Análisis de Seguridad</h3>
                        <div className="result-cards">
                            <div className="result-card">
                                <i className="fas fa-lock"></i>
                                <p>Combinaciones: <span>{combinations}</span></p>
                            </div>
                            <div className="result-card weak">
                                <i className="fas fa-exclamation-triangle"></i>
                                <p>Débil: <span>{weakProbability}</span></p>
                            </div>
                            <div className="result-card secure">
                                <i className="fas fa-shield-alt"></i>
                                <p>Segura: <span>{secureProbability}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;