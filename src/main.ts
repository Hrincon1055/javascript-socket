import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */ `
  <div>
    <h1>Websoket - client</h1>
    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>
    </br>
    <span id="server-status">offline</span>
  </div>
  <ul id='list-clients'></ul>
  <form id='message-form'>
    <input type='text' placeholder='message' id='message-input'/>
  </form>
  <h3>Messages</h3>
  </hr>
  <ul id='messages-ul'></ul>
`;
// connectToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;
btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) {
    return alert('Envie un token valido');
  }
  connectToServer(jwtToken.value.trim());
});
