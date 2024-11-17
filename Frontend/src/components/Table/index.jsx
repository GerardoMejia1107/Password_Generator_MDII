/* eslint-disable react/prop-types */
import './styles.css';
const Table = ({ data }) => {
  console.log(data);

  return (
    <table className='security-table'>
      <tbody>
        <tr>
          <td>Combinaciones variadas con repetición:</td>
          <td>{data.permutations}</td>
        </tr>
        <tr>
          <td>P(Encontrar en 1 intento):</td>
          <td>{data.secureProbability}</td>
        </tr>
        <tr>
          <td>Probabilidad en caso que lleve ñ:</td>
          <td>{data.probabilitySpanishSpecial}</td>
        </tr>
        <tr>
          <td>Entropía:</td>
          <td>{data.entropy}</td>
        </tr>
        <tr>
          <td>Seguridad:</td>
          <td>{data.security}</td>
        </tr>
        <tr>
          <td>Probabilidad de ser descifrada en 1,000 intentos:</td>
          <td>{data.probability1k}</td>
        </tr>

        <tr>
          <td>Probabilidad de ser descifrada en 10 millones de intentos:</td>
          <td>{data.probability10M}</td>
        </tr>

        <tr>
          <td>Tiempo estimado de descifrado (1,000 intentos/s):</td>
          <td>{data.timeToCrackLow}</td>
        </tr>
        <tr>
          <td>Tiempo estimado de descifrado (10 millones intentos/s):</td>
          <td>{data.timeToCrackHigh}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
