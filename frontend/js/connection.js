function Conn(username, roomId){
    this.roomId = roomId;
    this.username = username;
    this.chat = io.connect('http://localhost:3000/chat');
    this.game_data = io.connect('http://localhost:3000/game_data');
    
    this.chat.on('connect', () => {
        this.chat.emit('join', this.roomId, this.username)
    });
    this.chat.on('updateChat', (username, message) => {
        console.log("message received", message)
        var item = document.createElement("div");
        item.innerText = username + ": " + message

        document.getElementById("chat_list").appendChild(item)
    })


}
Conn.prototype.sendChat = function(text){
    this.chat.emit("sendChat", text);
}

