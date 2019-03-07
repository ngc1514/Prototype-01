var initHP = 2;
var initLoc = [300, 300];
var initAlive = true;

function registerPlayer()
{
    //$("#message").val().trim().length < 1
    var comment = document.getElementById("playerID").value;
    if(comment.length == 0 || comment.length>10)
    {
        alert("Please enter a valid name!")
    }
    else{
        // solve the backslash issue
        var messageElement = document.getElementById("playerID").value;
        ajaxPostRequest("/register", messageElement);
    }
}

function ajaxPostRequest(path, data){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
        }
    };
    request.open("POST", path);
    request.send(data);
}
