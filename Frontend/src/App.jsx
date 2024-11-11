import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8); //Setea el tamaño por defecto de la longitud de la contraseña a generar
  const [includeUppercase, setIncludeUppercase] = useState(false); //Estado de la opcion si incluir mayusculas
  const [includeNumbers, setIncludeNumbers] = useState(false); //Estado de la opcion si incluir numeros
  const [includeSymbols, setIncludeSymbols] = useState(false); //Estado de la opcion si incluir simbolos
  const [generatedPassword, setGeneratedPassword] = useState(''); //Estado que contiene la contraseña generada actual
  const [combinations, setCombinations] = useState('---'); //Estado que contiene el numero de combinaciones posibles a partir de la contraseña generada

  const [weakProbability, setWeakProbability] = useState('---'); //Estado que contiene la probabilidad
  const [secureProbability, setSecureProbability] = useState('---'); //Estado que contiene la probabilidad

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
