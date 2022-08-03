const ws = new WebSocket('ws://localhost:8080');
  let form = document.querySelector('form');
  let data = new Date();
  let hours = data.getHours();
  let minute = data.getMinutes();
  let message = document.querySelector('#message');
  let chat = document.querySelector('#chat')
  let user;

ws.onopen = () => {
  user = prompt('Enter your name', '')
  console.log('connected');
};

ws.onclose = () => {
  console.error('disconnected');
};

ws.onerror = error => {
  console.error('failed to connect', error);
};

ws.onmessage = event => {

  let msg = JSON.parse(event.data);
  let div = document.createElement('div');
  div.classList.add('div-message')
  div.innerHTML = `
    <p>${msg.user}</p>
    <p>${msg.text}</p>
    <p>${msg.hour}:${msg.minute}</p>`;
      
  chat.appendChild(div);
};

form.addEventListener('submit', event => {
  event.preventDefault();
  if(message.value) {
    let time = new Date();
    let msg = {
      user: user,
      text: message.value,
      hour: time.getHours(),
      minute: time.getMinutes()
    };
    ws.send(JSON.stringify(msg));
    message.value = '';  
  
    let div = document.createElement('div');
    div.classList.add('user-message')
    div.innerHTML = `
      <p>${msg.user}</p>
      <p>${msg.text}</p>
      <p>${msg.hour}:${msg.minute}</p>`;
        
    chat.appendChild(div);
  
  }
});