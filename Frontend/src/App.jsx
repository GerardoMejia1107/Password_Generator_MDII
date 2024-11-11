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

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'; //Letras minusculas posibles
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //Letras mayusculas posibles
    const numbers = '0123456789'; //Digitos posibles
    const symbols = '!@#$%^&*()_-+=<>?'; //Simbolos posibles (se pueden agregar más)

    //Variable que contiene los caracteres a usar (Campo muestral)
    let characters = lowercase; //Por defecto se usan las minusculas

    //Se evalua el estado de includeUppercase
    if (includeUppercase) {
      characters += uppercase; //Al campo muestral se le agrean las mayusculas
    }
    //Se evalua el estado de includeNumbers
    if (includeNumbers) {
      characters += numbers; //Al campo muestral se le agrean los numeros
    }
    //Se evalua el estado de includeUSymbols
    if (includeSymbols) {
      characters += symbols; //Al campo muestral se le agrean los simbolos
    }

    if (!characters) {
      characters = lowercase;
    }

    let password = ''; //Variable que va a contener la contraseña generada
    //Ya que un string es por defecto un objecto, yo puedo iterar sobre el como un array, y voy agregando de manera aleatorio los caracteres seleccionados del espacio muestral
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setGeneratedPassword(password); //Seteo el estado de la contraseña, a la contraseña generada
  };
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
