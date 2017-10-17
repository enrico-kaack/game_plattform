function Conn(){
    this.roomId;
    this.username;
    this.chat = io.connect('http://localhost:3000/chat');
    this.game_data = io.connect('http://localhost:3000/game_data');
    
    this.chat.on('connect', () => {

    });
    this.chat.on('updateChat', (username, message) => {
        console.log("message received", message)
        var item = document.createElement("div");
        item.innerText = username + ": " + message

        document.getElementById("chat_list").appendChild(item)
    })

    this.chat.on('updateUserConnected', (data)=>updateUserList(data));


}
Conn.prototype.sendChat = function(text){
    this.chat.emit("sendChat", text);
}

Conn.prototype.joinRoom = function(username, roomId){
    this.username = username;
    this.roomId = roomId;
    this.chat.emit('join', this.roomId, this.username);
}

