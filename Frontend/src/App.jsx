import { useState } from 'react';
import './App.css';
import {
  lowercasePool,
  uppercasePool,
  symbolsPool,
  numbersPool,
} from './config/bases';

import {
  calcEntropy,
  categorizeSecurity,
  calculateProbability,
  calculateTimeToCrack,
  formatProbability,
  conditionalProbability,
} from './utils/formulas';

import { copyToClipboard } from './utils/tools';
import Table from './components/Table/index';

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
  const [probability1k, setProbability1k] = useState('');
  const [probability10M, setProbability10M] = useState('');
  const [probabilitySpanishSpecial, setProbabilitySpanishSpecial] =
    useState('');
  const [timeToCrack, setTimeToCrack] = useState('');

  const generatePassword = () => {
    let characters = ''; 

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
    setProbability1k(
      formatProbability(calculateProbability(totalPermutations, 1000)),
    );

    setProbability10M(
      formatProbability(calculateProbability(totalPermutations, 10000000)),
    );

    if (password.includes('ñ') || password.includes('Ñ')) {
      setProbabilitySpanishSpecial(
        conditionalProbability(
          length,
          characters.length,
          secureProbability,
        ).toExponential(2),
      );
    } else {
      setProbabilitySpanishSpecial('');
    }

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
    setProbability1k('');
    setProbability10M('');
    setTimeToCrack('');
    setProbabilitySpanishSpecial('');
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
        <button
          onClick={() => {
            copyToClipboard(generatedPassword);
          }}
        >
          Copiar
        </button>
      </section>

      <section className='security-analysis-section'>
        {generatedPassword.length > 0 ? (
          <>
            <h3>Análisis de Seguridad</h3>
            <Table
              data={{
                permutations: permutations,
                secureProbability: secureProbability,
                probabilitySpanishSpecial: probabilitySpanishSpecial,
                entropy: entropy,
                security: security,
                probability1k: probability1k,
                probability10M: probability10M,
                timeToCrackLow: timeToCrack.low,
                timeToCrackHigh: timeToCrack.high,
              }}
            />
          </>
        ) : (
          ''
        )}
      </section>
    </main>
  );
}

export default App;
