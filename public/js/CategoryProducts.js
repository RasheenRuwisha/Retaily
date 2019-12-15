$(document).ready(function () {
    var pathname = window.location.pathname;
    if(pathname.includes("fashion")){
        loadCategoryProducts()
    }
});

function loadCategoryProducts(){
    $(".header-title").html(sessionStorage.category);

    var categories = "";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/categoryProducts?category=" + sessionStorage.category,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for(var i = 0; i< response.length; i++){
            categories += addProducts(response[i].name, response[i].price, response[i].image, response[i].name,response[i].productId)
        }
        $(".loader").remove();
        $(".products-items").html(categories);
        $(".products-items").trigger('create');

    });
}

function addProducts(name, price, image, promotion,productId ){

    var productItem =

        `
        <div class="item" onclick='addProductToSessionStorage("${productId}")'>
          <div class="align-favourite">
            <div class="add-to-cart-button-div style=" Style="background: none !important;">
              <a href="#popupLogin" data-rel="popup" data-position-to="window"
                class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                  src="../Resources/images/icons/heart (1).png" border="0" /></a>  
            </div>
          </div>
          <img class="product-image-items-display" src="${image}" alt=" PS4" />
          <p style="display: inline; text-decoration: line-through;" class="Product-Price">$ ${price}</p>
          <p style="display: inline;" class="Product-Price"><b>$399</b></p>
          <p class="Product-Price Product-Name">${name}</p>
          <div class="align-addtocart">
            <div class="add-to-cart-button-div">
              <a href="#${productId}" data-rel="popup" data-position-to="window"
                class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                  src="../Resources/images/icons/001-add White.png" border="0" /></a>
              <div data-role="popup" id="${productId}" data-theme="" class="ui-corner-all">
                <div style="padding:10px 20px; width: 200px;">
                              <h3 class="product-addtocart-popup">${name} </h3>
                  <p class="price">Product Price :</p>
                  <p class="price float-price">$ ${price}</p>
                  <br>
                  <p class="price">Promotion Price :</p>
                  <p class="price float-price">$399</p>
                  <br>
                  <br>
                  <p class="price">Quantity :</p>
                  <button class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../Resources/images/icons/002-substract.png" border="0"
                      width="35px" height="35px" />
                  </button>
                  <p class="price float-price">1</p>
                  <button class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../Resources/images/icons/001-add.png" border="0" width="35px"
                      height="35px" />
                  </button>
                  <br>
                  <br>
                  <p class="price">Total :</p>
                  <p class="price float-price">$399</p>
                    <div class=" button-container">
                    <button type="submit" class="login-button ui-btn ui-btn-inline rounded-button">Add to Cart</button>
                  </div>
                          
                </div>
              </div>
                 
            </div>
          </div>
  
  
        </div>
        `

    return productItem;
}


function addProductToSessionStorage(productId){
    console.log(productId);
    sessionStorage.product = productId;

    window.location = "ProductPage.html"
}