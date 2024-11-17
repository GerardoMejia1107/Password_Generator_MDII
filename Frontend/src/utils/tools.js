/**
 * Copia una contraseña al portapapeles.
 *
 * @param {string} password - Contraseña que se desea copiar.
 * Muestra un mensaje de confirmación si se copia exitosamente o un error si no hay contraseña.
 */
export const copyToClipboard = (password) => {
  if (password) {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada al portapapeles');
  } else {
    alert('No hay contraseña generada para copiar');
  }
};
