import {
  RAZONABLE,
  REALLY_STRONG,
  REALLY_WEAK,
  STRONG,
  WEAK,
} from '../config/secureType';

import {
  BITS_127,
  BITS_28,
  BITS_29,
  BITS_35,
  BITS_36,
  BITS_59,
  BITS_60,
} from '../config/bitsEntropy.js';

import { THRESHOLD } from '../config/bases.js';

/**
 * Calcula la entropía de una contraseña.
 *
 * @param {number} passwordLength - Longitud de la contraseña.
 * @param {number} totalPool - Tamaño del conjunto de caracteres posibles.
 * @returns {number} Entropía calculada en bits.
 */
export const calcEntropy = (passwordLength, totalPool) => {
  return passwordLength * Math.log2(totalPool);
};

/**
 * Categoriza el nivel de seguridad de una contraseña basado en su entropía en bits.
 *
 * @param {number} entropyValue - Valor de entropía de la contraseña.
 * @returns {string} Nivel de seguridad: `REALLY_WEAK`, `WEAK`, `RAZONABLE`, `STRONG` o `REALLY_STRONG`.
 */
export const categorizeSecurity = (entropyValue) => {
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

/**
 * Calcula la probabilidad de adivinar una contraseña.
 *
 * @param {number} totalCombinations - Total de combinaciones posibles.
 * @param {number} attempts - Número de intentos realizados.
 * @returns {number} Probabilidad de éxito.
 */
export const calculateProbability = (totalCombinations, attempts) => {
  return 1 - Math.pow(1 - 1 / totalCombinations, attempts);
};

/**
 * Calcula la probabilidad condicional ajustada para descifrar una contraseña considerando un carácter especial.
 *
 * @param {number} passwordLength - Longitud de la contraseña.
 * @param {number} pool - Tamaño del conjunto de caracteres posibles.
 * @param {number} probabilitySingleAttempt - Probabilidad de éxito en un solo intento.
 * @returns {number} Probabilidad condicional ajustada.
 */
export const conditionalProbability = (
  passwordLength,
  pool,
  probabilitySingleAttempt,
) => {
  const spanishSpeakingProba = 0.05; // Probabilidad fija de uso del carácter especial "ñ".

  const probabilityContainsSpecial = 1 - Math.pow(1 - 1 / pool, passwordLength);

  const adjustedProbabilitySingleAttempt =
    probabilitySingleAttempt * spanishSpeakingProba;

  const probabilityJoint =
    adjustedProbabilitySingleAttempt * probabilityContainsSpecial;

  return probabilityJoint / probabilityContainsSpecial;
};

/**
 * Formatea la probabilidad en un texto legible o notación exponencial.
 *
 * @param {number} probability - Valor de la probabilidad.
 * @returns {string} Texto formateado: "Casi imposible" si es menor al umbral,
 * o en notación exponencial si es mayor o igual.
 */
export const formatProbability = (probability) => {
  return probability < THRESHOLD
    ? 'Casi imposible'
    : probability.toExponential(2);
};

/**
 * Calcula el tiempo estimado para descifrar una contraseña con diferentes velocidades de intentos.
 *
 * @param {number} totalCombinations - Total de combinaciones posibles de la contraseña.
 * @returns {object} Tiempo estimado formateado:
 *  - `low`: Tiempo para 1,000 intentos/segundo.
 *  - `high`: Tiempo para 10,000,000 intentos/segundo.
 */
export const calculateTimeToCrack = (totalCombinations) => {
  const attempts1000 = totalCombinations / 1000; // 1,000 intentos/segundo
  const attempts10M = totalCombinations / 10_000_000; // 10,000,000 intentos/segundo

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
    high: formatTime(attempts10M),
  };
};
