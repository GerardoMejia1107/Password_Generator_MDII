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
  const [combinations, setCombinations] = useState('');
  const [secureProbability, setSecureProbability] = useState('');
  const [entropy, setEntropy] = useState('');
  const [security, setSecurity] = useState('');
  const [probability1k, setProbability1k] = useState('');
  const [probability10M, setProbability10M] = useState('');
  const [probabilitySpanishSpecial, setProbabilitySpanishSpecial] =
    useState('');
  const [timeToCrack, setTimeToCrack] = useState('');

  //Función encargada  de generar y llamar a todas las funciones que me dan el registro de seguridad con las probabilidades, entropia, tiempo estimado, etc..
  const generatePassword = () => {
    let characters = ''; //Estado inicial del espacio muestral

    if (includeLowerCase) characters += lowercasePool; //Se le suma el espacio muestral de las minusculas
    if (includeUppercase) characters += uppercasePool; //Se le suma el espacio muestral de las mayusculas
    if (includeNumbers) characters += numbersPool; //Se le suma el espacio muestral de los numeros
    if (includeSymbols) characters += symbolsPool; //Se le suma el espacio muestral de los simbolos

    //Se verifica que se ha seleccionado algun pool de caracteres (minusculas, mayusculas, numeros o simbolos)
    if (characters.length === 0) {
      alert('Selecciona al menos una opción de caracteres');
      return;
    }

    let password = ''; //Estado inicial que contiene la contraseña generada para el usuario
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); //Se generan numeros que serán los index aleatorios para seleccionar elementos del espacio muestral total
      password += characters[randomIndex]; //Se escogen elementos del espacio muestral total, con el randomIndex
    }

    setGeneratedPassword(password); //Seteamos la contraseña generada

    // Calcula combinaciones y probabilidad
    const totalCombinations = Math.pow(characters.length, length); //Calculo total de las combinaciones posibles con repeticion
    setCombinations(totalCombinations.toLocaleString()); //Seteamos las combinaciones totales calculadas
    setSecureProbability((1 / totalCombinations).toExponential(2)); //Se calcula la probabilidad de exito en general

    // Calcula entropía y clasifica la seguridad
    const entropyValue = calcEntropy(length, characters.length); //Calculo de la entropia
    setEntropy(entropyValue.toFixed(2)); //Seteamos el valor de la entropia
    setSecurity(categorizeSecurity(entropyValue)); //Seteamos la categorizacion de la seguridad de la contraseña

    // Calcula probabilidades de ser descifrada en diferentes intentos
    setProbability1k(
      formatProbability(calculateProbability(totalCombinations, 1000)), //Calculo de la probabilidad acumulativa para 1,000 intentos posteriores
    );

    setProbability10M(
      formatProbability(calculateProbability(totalCombinations, 10000000)), //Calculo de la probabilidad acumulativa para 10,000,000 intentos posteriores
    );

    //Verifiacion para deducir si la contraseña generada contiene "ñ || Ñ"
    if (password.includes('ñ') || password.includes('Ñ')) {
      setProbabilitySpanishSpecial(
        conditionalProbability( //Calculamos la probabilidad condicional: Probabilidad que el atacante descifre la contraseña dado que la ñ esta incluida
          length,
          characters.length,
          secureProbability,
        ).toExponential(2),
      );
    } else {
      setProbabilitySpanishSpecial('');
    }

    // Calcula tiempo estimado para ser descubierta
    setTimeToCrack(calculateTimeToCrack(totalCombinations)); //Calulo del tiempo estimado del descifrado de la clave
  };

  //Funcion para resetear todos los inputs
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
                permutations: combinations,
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
