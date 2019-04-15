var initHP = 2;
var initLoc = [300, 300];
var initAlive = true;

function registerPlayer()
{
    //$("#message").val().trim().length < 1
    var inputID = document.getElementById("playerID").value;
    if(inputID.length == 0 || inputID.length>10)
    {
        alert("Please enter a valid name!")
    }
    else{
        var messageElement = document.getElementById("playerID").value.replace(/\s+/g, '');
        document.getElementById("playerID").value = ""; //clear the box after input
        alert(inputID + " is now registered.");
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
