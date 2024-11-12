import { useState } from 'react';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowerCase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [combinations, setCombinations] = useState('');
    const [secureProbability, setSecureProbability] = useState('');
    const [entropy, setEntropy] = useState('');
    const [security, setSecurity] = useState('');

    const generatePassword = () => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~\\©®£¥€\n';

        let characters = ''; // Inicia como cadena vacía

        if (includeLowerCase) characters += lowercase;
        if (includeUppercase) characters += uppercase;
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;

        if (characters.length === 0) {
            alert('Selecciona al menos una opción de caracteres');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        setGeneratedPassword(password);

        // Calcula combinaciones y probabilidad
        const totalCombinations = Math.pow(characters.length, length);
        setCombinations(totalCombinations.toLocaleString());
        setSecureProbability((1 / totalCombinations).toExponential(2));

        // Calcula entropía y clasifica la seguridad
        const entropyValue = calcEntropy(length, characters.length);
        setEntropy(entropyValue.toFixed(2));
        setSecurity(categorizeSecurity(entropyValue));
    };

    const resetInputs = () => {
        setLength(8);
        setIncludeUppercase(false);
        setIncludeLowercase(false);
        setIncludeNumbers(false);
        setIncludeSymbols(false);
        setGeneratedPassword('');
        setCombinations('');
        setSecureProbability('');
        setEntropy('');
        setSecurity('');
    };

    const copyToClipboard = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword);
            alert('Contraseña copiada al portapapeles');
        } else {
            alert('No hay contraseña generada para copiar');
        }
    };

    const calcEntropy = (passwordLength, totalPool) => {
        return passwordLength * Math.log2(totalPool);
    };

    const categorizeSecurity = (entropyValue) => {
        if (entropyValue < 28) {
            return "Muy Débil";
        } else if (entropyValue >= 28 && entropyValue <= 35) {
            return "Débil";
        } else if (entropyValue >= 36 && entropyValue <= 59) {
            return "Razonable";
        } else if (entropyValue >= 60 && entropyValue <= 127) {
            return "Fuerte";
        } else {
            return "Muy Fuerte";
        }
    };

    return (
        <main className="generator-program-container">
            <section className="config-section">
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
                    <label>
                        <input type="checkbox" checked={includeLowerCase}
                               onChange={() => setIncludeLowercase(!includeLowerCase)}/>
                        Minúsculas
                    </label>
                    <label>
                        <input type="checkbox" checked={includeUppercase}
                               onChange={() => setIncludeUppercase(!includeUppercase)}/>
                        Mayúsculas
                    </label>
                    <label>
                        <input type="checkbox" checked={includeNumbers}
                               onChange={() => setIncludeNumbers(!includeNumbers)}/>
                        Números
                    </label>
                    <label>
                        <input type="checkbox" checked={includeSymbols}
                               onChange={() => setIncludeSymbols(!includeSymbols)}/>
                        Símbolos
                    </label>
                </div>

                <div className="button-group">
                    <button onClick={generatePassword}>Generar</button>
                    <button onClick={resetInputs}>Reiniciar</button>
                </div>
            </section>

            <section className="result-section">
                <h2>Contraseña Generada:</h2>
                <input type="text" value={generatedPassword} readOnly/>
                <button onClick={copyToClipboard}>Copiar</button>
            </section>

            <section className="security-analysis-section">
                <h3>Análisis de Seguridad</h3>

                <table className="security-table">
                    <tbody>
                    <tr>
                        <td>Permutaciones:</td>
                        <td>{combinations}</td>
                    </tr>
                    <tr>
                        <td>P(Encontrar en 1 intento):</td>
                        <td>{secureProbability}</td>
                    </tr>
                    <tr>
                        <td>Entropía:</td>
                        <td>{entropy}</td>
                    </tr>
                    <tr>
                        <td>Seguridad:</td>
                        <td>{security}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default App;
