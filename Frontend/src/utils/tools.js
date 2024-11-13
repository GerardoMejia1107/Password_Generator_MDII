export const copyToClipboard = (password) => {
  if (password) {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada al portapapeles');
  } else {
    alert('No hay contraseña generada para copiar');
  }
};
