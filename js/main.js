function doRegister() {

    $("#error-message").css("display","none")

    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    var email = $("#email").val().trim();
    var confirmpass = $("#confpassword").val().trim();

    if (username === "") {
        $("#username").addClass("text-box-error");
        $("#username-error").css("display","inline")
        $("#username-label").css("display","none")
    } else {
        $("#username").removeClass("text-box-error")
        $("#username-error").css("display","none")
        $("#username-label").css("display","inline")
    }

    if (password === "") {
        $("#password").addClass("text-box-error")
        $("#password-error").css("display","inline")
        $("#password-label").css("display","none")
    } else {
        $("#password").removeClass("text-box-error")
        $("#password-error").css("display","none")
        $("#password-label").css("display","inline")
    }

    if (email === "") {
        $("#email").addClass("text-box-error");
        $("#email-error").css("display","inline")
        $("#email-label").css("display","none")
    } else {
        $("#email").removeClass("text-box-error")
        $("#email-error").css("display","none")
        $("#email-label").css("display","inline")
    }

    if (confirmpass === "") {
        $("#confpassword").addClass("text-box-error")
        $("#confpassword-error").css("display","inline")
        $("#confpassword-label").css("display","none")
    } else {
        $("#confpassword").removeClass("text-box-error")
        $("#confpassword-error").css("display","none")
        $("#confpassword-label").css("display","inline")
    }


    if((confirmpass !== "" && password !== "")&&(confirmpass !== password)){
        $("#confpassword-error-mis").css("display","inline")
        $("#confpassword-label").css("display","none")
    }else{
        $("#confpassword-error-mis").css("display","none")
        if(confirmpass !== ""){
            $("#confpassword-label").css("display","inline")
        }
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/register",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "a335e3b8-b1df-4a65-8ec7-6c48448d06d1"
        },
        "processData": false,
        "data": "{\n\t\"username\":\""+username+"\",\n\t\"email\":\""+email+"\",\n\t\"password\":\""+email+"\",\n\t\"completion\":[\"false\",\"false\",\"false\",\"false\",\"false\",\"false\",\"false\"],\n\t\"coupons\":[],\n\t\"score\":0\n}"
    }


    if(username !== "" && email !== "" && (confirmpass !== "" && password !== "")&&(confirmpass === password)){
        $("#login-btn").css("display", "none");
        $("#processing-btn").addClass("processing-btn-important");
        $.ajax(settings).done(function(response) {
            console.log(response);
            if (response === 2000) {
                localStorage.email =  email;
                localStorage.Score = 0;
                localStorage.Username = username;
                toast("Registration Successful!")
                window.location = ("Dashboard.html");
            }else if (response === 3001) {
                $("#error-message").css("display","inline")
                $("#error-message").html("Email associated with another account!")
            }
            else if (response === 3000) {
                $("#error-message").css("display","inline")
                $("#error-message").html("Registration failed")
            }
            $("#login-btn").css("display", "inline");
            $("#processing-btn").removeClass("processing-btn-important");
        }).error(function(){
            $("#login-btn").css("display", "inline");
            $("#processing-btn").removeClass("processing-btn-important");
        });
    }


}

function doLogin() {


    var username = $("#email").val().trim();
    var password = $("#password").val().trim();

    if (username === "") {
        $("#email").addClass("text-box-error");
        $("#username-error").css("display","inline")
        $("#username-label").css("display","none")
    } else {
        $("#email").removeClass("text-box-error")
        $("#username-error").css("display","none")
        $("#username-label").css("display","inline")
    }

    if (password === "") {
        $("#password").addClass("text-box-error")
        $("#password-error").css("display","inline")
        $("#password-label").css("display","none")
    } else {
        $("#password").removeClass("text-box-error")
        $("#password-error").css("display","none")
        $("#password-label").css("display","inline")
    }

    if(username !== "" && password !== ""){
        $("#error-message").css("display","none")
        $("#login-btn").css("display", "none");
        $("#processing-btn").addClass("processing-btn-important");
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://retaily-api.herokuapp.com/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
                "Postman-Token": "32dc8b85-292f-4687-9ed0-6122f09befaf"
            },
            processData: false,
            data:
            '{\n\t"email":"' +
            $("#email").val() +
            '",\n\t"password":"' +
            $("#password").val() +
            '"\n}'
        };

        $.ajax(settings).done(function(response) {
            console.log(response)
            if (response === 2001) {
                localStorage.email =  $("#email").val();
                loadDetails()
            }else if(response === 3003) {
                $("#error-message").css("display","inline")
                $("#error-message").html("Invalid Email or Password!")
            }
            else if(response === 3004) {
                $("#error-message").css("display","inline")
                $("#error-message").html("Invalid Email or Password!")
            }
            $("#login-btn").css("display", "inline");
            $("#processing-btn").removeClass("processing-btn-important");
        }).error(function(){
            $("#server-error").popup("open");
            setTimeout(function () {
                $("#server-error").popup("close");
            }, 3000);
            $("#login-btn").css("display", "inline");
            $("#processing-btn").removeClass("processing-btn-important");
        })
    }


}

function navigateToCategories() {
  $.mobile.navigate(
    "Dashboard.html",
    { transition: "slideup" },
    (event = loadCategories())
  );
}


function loadDetails(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/details?email="+localStorage.email,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "a67d016a-64d9-4948-b436-1313714901b1"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.Score = response.score;
        localStorage.Username = response.username;
        window.location = ("Dashboard.html");

    });
}

var toast=function(msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
        .css({
            display: "block",
            opacity: 0.90,
            position: "fixed",
            padding: "7px",
            "text-align": "center",
            width: "270px",
            left: ($(window).width() - 284) / 2,
            top: $(window).height() / 2
        })
        .appendTo($.mobile.pageContainer).delay(1500)
        .fadeOut(400, function () {
            $(this).remove();
        });
}
