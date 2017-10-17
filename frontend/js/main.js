window.onload = function(){
    var room = getQueryVariable("room");
    console.log("room number from url", room)
    $('#game_area').load('templates/username_room.html', ()=>{
        if ( room !== null){
            //room in url, ask for name and set the room
            $('#input_roomId').val(room)
            $('#button_joinRoom').click(() => joinRoom($('#input_username').val(), $('#input_roomId').val()))
        }
    })

    
}

function joinRoom(username, roomId){
    if (username.length>0 && roomId.length>0){
        conn.joinRoom(username, roomId)
    }else{
        $('#input_username').css("border-color", "red")
    }
        
}