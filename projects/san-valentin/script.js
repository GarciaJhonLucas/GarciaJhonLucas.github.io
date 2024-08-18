const buttonNo = document.querySelector('#no')
const buttonYes = document.querySelector('#yes')

let fontSize = 2

let messages = [
  'Estas segurx?',
  'Piensalo bien',
  'Piensalo muy bien',
  'Piensalo',
  'Mira el otro botón',
  'No lo hagas',
  '¿De verdad quieres hacerlo?',
  '¡Detente un momento!',
  '¿Estás segurx de esto?',
  '¡No lo hagas!',
  'Mejor lo piensas otra vez...',
  '¿Realmente vale la pena?',
  'Esto podría ser un error...',
  '¡Espera, piénsalo mejor!',
  '¡Alto ahí!',
  'Esto no parece una buena idea...',
  '¡No lo presiones!',
  'Puede que te arrepientas...',
  'Es mejor reconsiderarlo...',
  'No te precipites...',
  '¡Ten cuidado!',
  '¿Seguro que quieres continuar?',
  '¡No me presiones!',
  'Piénsalo dos veces...',
  'Esto no es lo que parece...',
  '¡Es una trampa!',
  '¿Por qué no eliges otra opción?',
  '¡No presiones ese botón!'
];
let usedMessages = new Set();

buttonNo.addEventListener('click', () => {
  fontSize += 0.5;
  buttonYes.style.fontSize = `${fontSize}rem`;

  let availableMessages = messages.filter(msg => !usedMessages.has(msg));
  if (availableMessages.length === 0) {
    usedMessages.clear(); // Reinicia el conjunto si todos los mensajes ya fueron usados
    availableMessages = [...messages];
  }

  const indexRandom = Math.floor(Math.random() * availableMessages.length);
  const selectedMessage = availableMessages[indexRandom];

  usedMessages.add(selectedMessage);
  buttonNo.textContent = selectedMessage;
});

buttonYes.addEventListener('click', () => {
  document.querySelector('#message').style.display = 'flex';
});