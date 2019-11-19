const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

const username = localStorage.username ? localStorage.username : 'Anon'; 

const chatroom = new ChatRoom('gaming', username);
const chatUI = new ChatUI(chatList);

chatroom.getChats(data => chatUI.render(data));

rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

newChatForm.addEventListener('submit', e =>{
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message) 
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e =>{
  e.preventDefault();
  const name = newNameForm.name.value.trim();
  chatroom.updateName(name);
  newNameForm.reset();

  updateMessage.innerText = `Name was updated to ${name}
  `;
  setTimeout(() =>updateMessage.innerText = '', 3000);
});