function doRegister(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/register",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "ec19489e-5281-4aec-a7fa-2b48c9770f81"
        },
        "processData": false,
        "data": "{\n\t\"username\":\""+$("#username").val+"\",\n\t\"email\":\""+$("#email").val+"\",\n\t\"password\":\""+$("#password").val+"\"\n}"
    }

    $.ajax(settings).done(function (response) {
        if(response === 2001){
            $.mobile.changePage( "Login.html", { transition: "slideup"} );
        }
    });
}


function doLogin(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "32dc8b85-292f-4687-9ed0-6122f09befaf"
        },
        "processData": false,
        "data": "{\n\t\"email\":\""+$("#username").val()+"\",\n\t\"password\":\""+$("#password").val()+"\"\n}"
    }

    $.ajax(settings).done(function (response) {
        if(response === 2001){
            $.mobile.changePage( "Main.html", { transition: "slideup"} );
        }
    });
}

function navigateToCategories(){
    $.mobile.navigate( "Catagories.html", { transition: "slideup"} , event = loadCategories());
}