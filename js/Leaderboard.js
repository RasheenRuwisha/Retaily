
$(document).ready(function() {
    loadLeaderboard();
});


function setScores(){
    var scores = loadLeaderboard();

}


function loadLeaderboard(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/leaderboard",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "a1b01347-cdaf-43db-957e-26b9443d2dbf"
        }
    }

    var restLead = "";
    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.length > 0){
            $("#first-place-name").text(response[0].username);
            $("#first-place-point").text(response[0].score);
        }
        if(response.length > 1){
            $("#second-place-name").text(response[1].username);
            $("#second-place-point").text(response[1].score);
        }
        if(response.length > 2){
            $("#third-place-name").text(response[2].username);
            $("#third-place-point").text(response[2].score);
        }

        for(var i =0;i< response.length;i++){
            restLead += loadRestLeader(response[i].username,response[i].score);
        }

        $(".leaderboard-participants").html(restLead);
        $(".leaderboard-participants").trigger("create");

    });
}


function loadRestLeader(username, score){
    var html = `  <div class="user-leaderboard">
                <p class="price">${username}</p>
                <p class="user-point  float-price" style="color: #EF963A;">${score}</p>
            </div>
`
    return html;
}