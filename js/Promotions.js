$(document).ready(function() {
  //   var settings = {
  //     async: true,
  //     crossDomain: true,
  //     url: "https://retaily-api.herokuapp.com/getPromotions",
  //     method: "GET",
  //     headers: {
  //       "cache-control": "no-cache",
  //       "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
  //     }
  //   };

  //   $.ajax(settings).done(function(response) {
  //     console.log(response);
  //     for (var i = 0; i < response.length; i++) {
  //       promotions += addProducts(
  //         response[i].name,
  //         response[i].price,
  //         response[i].image,
  //         response[i].name,
  //         response[i].productId
  //       );
  //     }
  //     $(".loader").remove();
  //     $(".products-items").html(promotions);
  //     $(".products-items").trigger("create");
  //   });
  loadPromotionProducts();
});

function loadPromotionProducts() {
  var promotions = "";

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://retaily-api.herokuapp.com/getPromotions",
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      promotions += addProducts(
        response[i].promotionId,
        response[i].name,
        response[i].description,
        response[i].image
      );
    }
    $(".loader").remove();
    $(".products-items").html(promotions);
    $(".products-items").trigger("create");
  });
}

function addProducts(promotionId, name, description, image) {
  var productItem = `
        <div class="main">
          <div class="pr-card">
            <div
              class="promotion-card"
              style="background-color:rgb(209,209,247);"
            >
              <div>
                <img
                  src="${image}"
                  width="100px"
                  style="margin-left:30%;"
                />
              </div>
              <h6 class="login-labels">${name}</h6>
              <p class="promotion-text">
              ${description}
              </p>
              <a onclick='addToSessionStorage("${promotionId}")' style="color: #c29a0c;">View</a>
            </div>
          </div>
        </div>
        `;

  return productItem;
}

function addToSessionStorage(promotionId) {
  console.log(promotionId);
  sessionStorage.promotion = promotionId;
  window.location = "PromotionProducts.html";
}
