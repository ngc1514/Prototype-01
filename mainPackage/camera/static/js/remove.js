function removePlayer()
{
    //$("#message").val().trim().length < 1
    var inputID = document.getElementById("removeID").value;
    if(inputID.length == 0 || inputID.length>10)
    {
        alert("Please enter a valid name!")
    }
    else{
        var messageElement = document.getElementById("removeID").value.replace(/\s+/g, '');
        document.getElementById("removeID").value = ""; //clear the box after input
        ajaxPostRequest("/remove", messageElement);
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
