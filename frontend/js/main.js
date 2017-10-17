window.onload = function(){
    var room = getQueryVariable("room");
    console.log("room number from url", room)
    $('#game_area').load('templates/username_room.html', ()=>{
        if ( room !== null){
            //room in url, ask for name and set the room
            $('#input_roomId').val(room)       
        }
        $('#button_joinRoom').click(() => {
            joinRoom($('#input_username').val(), $('#input_roomId').val());
            mainScreen();
        })
    })

    
}

function joinRoom(username, roomId){
    if (username.length>0 && roomId.length>0){
        conn.joinRoom(username, roomId)
    }else{
        alert("please insert name and room")
    }
        
}

function mainScreen(){
    $('#game_area').load('templates/mainScreen.html', ()=>{
        
    })
    
}

function updateUserList(userList){
    $('#member_list').empty();
    userList.forEach((element)  => {
       $.get('templates/client_item.html', (data)=>{
            var item = $.parseHTML(data);
            $('.name', item).text(element[Object.keys(element)].name)
            $('#member_list').append(item)
        })
    });
}