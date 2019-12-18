$(window).ready(function() {
  var pathname = window.location.pathname;
  if (pathname.includes("Catagories")) {
    loadCategories();
  }
});

function loadCategories() {
  console.log("Sakke");
  var categories = "";

  try {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://retaily-api.herokuapp.com/categories",
      method: "GET",
      headers: {
        "cache-control": "no-cache",
        "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
      }
    };

    $.ajax(settings).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        categories += addCategoryItem(response[i].name, response[i].image);
      }
      $(".category-items").html(categories);
      $(".category-items").trigger("create");
    });
  } catch (err) {
    console.log("loadCategories failed");
    console.log(err);
  }
}

function addCategoryItem(name, image) {
  try {
    var categoryItem = `
        <div class="item">
                    <div class="align-favourite">

                    </div>
                    <a style="color:black;text-decoration: none;" href='fashion.html?id=${name}' rel='external'>


                        <img class="catagories category-image-items-display" src=${image}
                            alt=" PS4" />
                        <p style="color:black;text-align: center;margin-left: 0px; margin-top:20px ;"
                            class="Product-Price Product-Name">${name}</p>
                    </a>
                </div>
        `;
    return categoryItem;
  } catch (err) {
    console.log("addCategoryItem failed");
    console.log(err);
  }
}

