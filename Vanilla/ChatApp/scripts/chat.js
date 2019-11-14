class ChatRoom{
  constructor(room, username){
    this.room = room,
    this.username = username,
    this.chats = db.collection('chats');
  }
  async addChat(message){
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      utime: firebase.firestore.Timestamp.fromDate(now)
    };
    const response = await this.chats.add(chat);
    return response;
  }
}

//const chatroom = new ChatRoom('gaming','Rhys');

// chatroom.addChat('hello world')
//   .then(() => console.log('chat added'))
//   .catch(err => console.log(err));