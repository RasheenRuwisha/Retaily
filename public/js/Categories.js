$(window).ready(function () {
    var pathname = window.location.pathname;
    if(pathname.includes("Catagories")){
        loadCategories()
    }
});


function loadCategories(){
    console.log("Sakke")
    var categories = "";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/categories",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for(var i = 0; i< response.length; i++){
            categories += addCategoryItem(response[i].name, response[i].image)
        }
        $(".category-items").html(categories);
        $(".category-items").trigger('create');
    });
}

function addCategoryItem(name, image){
    var categoryItem =

        `
        <div class="item">
                    <div class="align-favourite">

                    </div>
                    <a style="text-decoration: none;" onclick='addToSessionStorage("${name}")'>


                        <img class="catagories category-image-items-display" src=${image}
                            alt=" PS4" />
                        <p style="text-align: center;margin-left: 0px; margin-top:20px ;"
                            class="Product-Price Product-Name">${name}</p>
                    </a>
                </div>
        `
    return categoryItem;
}


function addToSessionStorage(categoryId){
    console.log(categoryId);
    sessionStorage.category = categoryId;
    window.location  =("fashion.html")
}