import { useState } from 'react';
import './App.css';
import {
  lowercasePool,
  uppercasePool,
  symbolsPool,
  numbersPool,
  THRESHOLD,
} from './config/bases';

import {
  REALLY_WEAK,
  WEAK,
  RAZONABLE,
  STRONG,
  REALLY_STRONG,
} from './config/secureType';

import {
  BITS_28,
  BITS_29,
  BITS_35,
  BITS_36,
  BITS_59,
  BITS_60,
  BITS_127,
} from './config/bitsEntropy.js';

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowerCase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [permutations, setPermutations] = useState('');
  const [secureProbability, setSecureProbability] = useState('');
  const [entropy, setEntropy] = useState('');
  const [security, setSecurity] = useState('');
  const [probability100k, setProbability100k] = useState('');
  const [probability1M, setProbability1M] = useState('');
  const [probability10M, setProbability10M] = useState('');
  const [timeToCrack, setTimeToCrack] = useState('');

  const generatePassword = () => {
    let characters = ''; // Inicia como cadena vacía

    if (includeLowerCase) characters += lowercasePool;
    if (includeUppercase) characters += uppercasePool;
    if (includeNumbers) characters += numbersPool;
    if (includeSymbols) characters += symbolsPool;

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
    const totalPermutations = Math.pow(characters.length, length);
    setPermutations(totalPermutations.toLocaleString());
    setSecureProbability((1 / totalPermutations).toExponential(2));

    // Calcula entropía y clasifica la seguridad
    const entropyValue = calcEntropy(length, characters.length);
    setEntropy(entropyValue.toFixed(2));
    setSecurity(categorizeSecurity(entropyValue));

    // Calcula probabilidades de ser descifrada en diferentes intentos usando la fórmula correcta
    setProbability100k(
      formatProbability(calculateProbability(totalPermutations, 100000)),
    );
    setProbability1M(
      formatProbability(calculateProbability(totalPermutations, 1000000)),
    );
    setProbability10M(
      formatProbability(calculateProbability(totalPermutations, 10000000)),
    );

    // Calcula tiempo estimado para ser descubierta
    setTimeToCrack(calculateTimeToCrack(totalPermutations));
  };

  const resetInputs = () => {
    setLength(8);
    setIncludeUppercase(false);
    setIncludeLowercase(false);
    setIncludeNumbers(false);
    setIncludeSymbols(false);
    setGeneratedPassword('');
    setPermutations('');
    setSecureProbability('');
    setEntropy('');
    setSecurity('');
    setProbability100k('');
    setProbability1M('');
    setProbability10M('');
    setTimeToCrack('');
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
    if (entropyValue < BITS_28) {
      return REALLY_WEAK;
    } else if (entropyValue >= BITS_29 && entropyValue <= BITS_35) {
      return WEAK;
    } else if (entropyValue >= BITS_36 && entropyValue <= BITS_59) {
      return RAZONABLE;
    } else if (entropyValue >= BITS_60 && entropyValue <= BITS_127) {
      return STRONG;
    } else {
      return REALLY_STRONG;
    }
  };

  const calculateProbability = (totalCombinations, attempts) => {
    return 1 - Math.pow(1 - 1 / totalCombinations, attempts);
  };

  const formatProbability = (probability) => {
    return probability < THRESHOLD
      ? 'Casi imposible'
      : probability.toExponential(2);
  };

  // Calcula el tiempo estimado para ser descubierto basado en intentos por segundo
  const calculateTimeToCrack = (totalCombinations) => {
    const attempts1000 = totalCombinations / 1000; // 1,000 intentos/segundo
    const attempts1M = totalCombinations / 1_000_000; // 1,000,000 intentos/segundo
    const attempts1B = totalCombinations / 1_000_000_000; // 1,000,000,000 intentos/segundo

    const formatTime = (seconds) => {
      if (seconds < 60) return `${seconds.toFixed(2)} segundos`;
      const minutes = seconds / 60;
      if (minutes < 60) return `${minutes.toFixed(2)} minutos`;
      const hours = minutes / 60;
      if (hours < 24) return `${hours.toFixed(2)} horas`;
      const days = hours / 24;
      if (days < 365) return `${days.toFixed(2)} días`;
      const years = days / 365;
      return `${years.toFixed(2)} años`;
    };

    return {
      low: formatTime(attempts1000),
      medium: formatTime(attempts1M),
      high: formatTime(attempts1B),
    };
  };

  return (
    <main className='generator-program-container'>
      <section className='config-section'>
        <h1>Generador de Contraseñas</h1>
        <label htmlFor='length'>Longitud:</label>
        <input
          type='number'
          id='length'
          min='4'
          max='20'
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <div className='options'>
          <label>
            <input
              type='checkbox'
              checked={includeLowerCase}
              onChange={() => setIncludeLowercase(!includeLowerCase)}
            />
            Minúsculas
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Mayúsculas
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Números
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Símbolos
          </label>
        </div>

        <div className='button-group'>
          <button onClick={generatePassword}>Generar</button>
          <button onClick={resetInputs}>Reiniciar</button>
        </div>
      </section>

      <section className='result-section'>
        <h2>Contraseña Generada:</h2>
        <input type='text' value={generatedPassword} readOnly />
        <button onClick={copyToClipboard}>Copiar</button>
      </section>

      <section className='security-analysis-section'>
        <h3>Análisis de Seguridad</h3>

        <table className='security-table'>
          <tbody>
            <tr>
              <td>Permutaciones:</td>
              <td>{permutations}</td>
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
            <tr>
              <td>Probabilidad de ser descifrada en 100,000 intentos:</td>
              <td>{probability100k}</td>
            </tr>
            <tr>
              <td>Probabilidad de ser descifrada en 1 millón de intentos:</td>
              <td>{probability1M}</td>
            </tr>
            <tr>
              <td>
                Probabilidad de ser descifrada en 10 millones de intentos:
              </td>
              <td>{probability10M}</td>
            </tr>
            <tr>
              <td>Tiempo estimado de descifrado (1,000 intentos/s):</td>
              <td>{timeToCrack.low}</td>
            </tr>
            <tr>
              <td>Tiempo estimado de descifrado (1 millón intentos/s):</td>
              <td>{timeToCrack.medium}</td>
            </tr>
            <tr>
              <td>Tiempo estimado de descifrado (1 billón intentos/s):</td>
              <td>{timeToCrack.high}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
