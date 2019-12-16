$(document).ready(function() {
    var pathname = window.location.pathname;
    if (pathname.includes("fashion")) {
        loadCategoryProducts();
    }
});

function loadCategoryProducts() {
    $(".header-title").html(sessionStorage.category);

    var categories = "";

    try {
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://retaily-api.herokuapp.com/categoryProducts?category=" +
                sessionStorage.category,
            method: "GET",
            headers: {
                "cache-control": "no-cache",
                "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
            }
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                categories += addProducts(
                    response[i].name,
                    response[i].price,
                    response[i].image,
                    response[i].name,
                    response[i].productId
                );
            }
            $("#drop-select").html(` <select name="select-native-2" id="select-native-3" data-iconpos="right">
                    <option value="1" style="width: 100px !important;">Price From Lowest to the Highest</option>
                    <option value="2" style="width: 100px !important;">Price From Highest to the Lowest
            </option>
                </select>`)
            $(".loader").remove();
            $(".products-items").html(categories);
            $("#drop-select").trigger("create");
            $(".products-items").trigger("create");
        });
    } catch (err) {
        console.log("loadCategoryProducts failed");
        console.log(err);
    }
}

function addProducts(name, price, image, promotion, productId) {
    try {
        var productItem = `
        <div class="item">
          <div class="align-favourite">
            <div class="add-to-cart-button-div style=" Style="background: none !important;">
              <a href="#popupLogin" data-rel="popup" data-position-to="window"
                class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                  src="../Resources/images/icons/heart (1).png" border="0" /></a>  
            </div>
          </div>
          <img class="product-image-items-display" onclick='addProductToSessionStorage("${productId}")' src="${image}" alt=" PS4" />
          <p style="display: inline; text-decoration: line-through;" class="Product-Price">$ ${price}</p>
          <p style="display: inline;" class="Product-Price"><b>$399</b></p>
          <p class="Product-Price Product-Name" onclick='addProductToSessionStorage("${productId}")'>${name}</p>
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
                  <button onclick="decrementQuantity('qty-${productId}')" class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../Resources/images/icons/002-substract.png" border="0"
                      width="35px" height="35px" />
                  </button>
                  <p class="price float-price" id="qty-${productId}">1</p>
                  <button onclick="incrementQuantity('qty-${productId}')"  class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../Resources/images/icons/001-add.png" border="0" width="35px"
                      height="35px" />
                  </button>
                  <br>
                  <br>
                  <p class="price">Total :</p>
                  <p class="price float-price">$399</p>
                    <div class=" button-container">
                    <button onclick=addToCart("${productId}") type="submit" class="login-button ui-btn ui-btn-inline rounded-button">Add to Cart</button>
                  </div>
                          
                </div>
              </div>
                 
            </div>
          </div>
  
  
        </div>
        `;

        return productItem;
    } catch (err) {
        console.log("addProducts failed");
        console.log(err);
    }
}

function addProductToSessionStorage(productId) {
    console.log(productId);
    sessionStorage.product = productId;

    window.location = "ProductPage.html";
}


function addToCart(productid) {
    var value = $(`#qty-${productid}`).text();
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://retaily-api.herokuapp.com/addToCart",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "0db2443e-4c0b-437a-a10e-5e0659219599"
        },
        processData: false,
        data: '{\n\t"email":"sheen.ruwisha12@gmail.com",\n\t"productId":"' +
            productid +
            '",\n     "qty":' +
            parseInt(value) +
            "\n}\n"
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response === 2005) {
            $(`#${productid}`).popup("close");
            $("#cart-success").popup("open");
            setTimeout(function() {
                $("#cart-success").popup("close");
            }, 10000);
        } else if (response === 3006) {
            $("#cart-error").popup("open");
            setTimeout(function() {
                $("#cart-error").popup("close");
            }, 2000);
        }
    }).error(function() {
        $("#cart-error").popup("open");
        setTimeout(function() {
            $("#cart-error").popup("close");
        }, 2000);
    });
}

function incrementQuantity(id) {
    var currentQuantity = document
        .getElementById(id)
        .innerHTML.valueOf();
    currentQuantity++;
    document.getElementById(id).innerHTML = currentQuantity;
}

function decrementQuantity(id) {
    var currentQuantity = document
        .getElementById(id)
        .innerHTML.valueOf();
    if (!(currentQuantity == 1)) {
        currentQuantity--;
        document.getElementById(id).innerHTML = currentQuantity;
    }
}