function login(){
    inputName = document.getElementById("loginID");

    function login()
    {
        //$("#message").val().trim().length < 1
        var inputID = document.getElementById("playerID").value;
        if(isRegister("/checkRegister", inputID))
        {
            alert("You're not registered! ")
        }
        else{
            var messageElement = document.getElementById("playerID").value.replace(/\s+/g, '');
            document.getElementById("playerID").value = ""; //clear the box after input
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

    function isRegister(path, data){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200){
            }
        };
        request.open("GET", path);
        request.send(data);
    }

}