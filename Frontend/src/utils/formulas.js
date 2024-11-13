import {
  REALLY_WEAK,
  WEAK,
  RAZONABLE,
  STRONG,
  REALLY_STRONG,
} from '../config/secureType';

import {
  BITS_28,
  BITS_29,
  BITS_35,
  BITS_36,
  BITS_59,
  BITS_60,
  BITS_127,
} from '../config/bitsEntropy.js';

import { THRESHOLD } from '../config/bases.js';

export const calcEntropy = (passwordLength, totalPool) => {
  return passwordLength * Math.log2(totalPool);
};

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

export const calculateProbability = (totalCombinations, attempts) => {
  return 1 - Math.pow(1 - 1 / totalCombinations, attempts);
};

export const formatProbability = (probability) => {
  return probability < THRESHOLD
    ? 'Casi imposible'
    : probability.toExponential(2);
};

// Calcula el tiempo estimado para ser descubierto basado en intentos por segundo
export const calculateTimeToCrack = (totalCombinations) => {
  const attempts1000 = totalCombinations / 1000; // 1,000 intentos/segundo
  const attempts1M = totalCombinations / 1_000_000; // 1,000,000 intentos/segundo
  const attempts1B = totalCombinations / 10_000_000; // 10,000,000 intentos/segundo

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
