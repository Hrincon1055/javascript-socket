import { Manager, Socket } from 'socket.io-client';
let socket: Socket;
export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token,
    },
  });
  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListeners();
};

const addListeners = () => {
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!;
  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUL = document.querySelector<HTMLUListElement>('#list-clients')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected';
  });
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnected';
  });
  socket.on('clients-updated', (clients: string[]) => {
    let clientsHTML = '';
    clients.forEach((clientID: string) => {
      clientsHTML += /*html */ `
        <li>${clientID}</li>
      `;
    });
    clientsUL.innerHTML = clientsHTML;
  });
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) {
      return;
    }
    socket.emit('message-from-client', {
      id: 'yo',
      message: messageInput.value.trim(),
    });
    messageInput.value = '';
  });
  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const newMessage = /*html */ `
        <li>
          <strong>${payload.fullName}</strong>
          <span>${payload.message}</span>
        </li>
      `;
      const li = document.createElement('li');
      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
