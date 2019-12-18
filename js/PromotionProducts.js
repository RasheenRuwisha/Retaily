var product;
var fav = [];
$(document).ready(function() {
    var pathname = window.location.pathname;
    if (pathname.includes("PromotionProducts")) {
        loadPromotionProducts();
    }
});

function loadPromotionProducts() {
    try {
        $(".header-title").html("Products");

        var promotions = "";

        var settings = {
            async: true,
            crossDomain: true,
            url: "https://retaily-api.herokuapp.com/getPromotionsItems?id=" +
                localStorage.promotion,
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
                    response[i].name,
                    response[i].price,
                    response[i].image,
                    response[i].hasDiscount,
                    response[i].productId,
                    response[i].discountPrice
                );
            }
            $(".loader").remove();
            $(".products-items").html(promotions);
            $(".products-items").trigger("create");
        });
    } catch (error) {
        console.log("loadPromotionProducts failed");
        console.log(error);
    }
}

function addProducts(name, price, image, promotion, productId, discountPrice) {

    var popPrice = "";
    var mainPrice = "";
    var totalPrice = ""

    if (name.length > 17) {
        name = name.substr(0, 17);
        name += "...";
    }

    var favIcon = "";



    if (fav.includes(productId)) {
        favIcon += `
       <div onclick="removeFav('${localStorage.email}${productId}','#${productId}-fav-image')" class="add-to-cart-button-div style=" Style="background: none !important;">
            <img style="z-index:998 !important;" id="${productId}-fav-image" class="add-to-cart-plus-icon"
                src="../Resources/images/icons/valentines-heart.png" border="0" />
          </div>
      `
    } else {
        favIcon += `
       <div onclick="addToFav('${productId}','#${productId}-fav-image')" class="add-to-cart-button-div style=" Style="background: none !important;">
            <img style="z-index:998 !important;" id="${productId}-fav-image" class="add-to-cart-plus-icon"
                src="../Resources/images/icons/heart%20(1).png" border="0" />
          </div>
      `
    }



    if (promotion) {
        popPrice += `
      <p class="price">Product Price :</p>
                <p class="price float-price">$${price}</p>
                <br>
                <p class="price">Promotion Price :</p>
                <p class="price float-price">$${discountPrice}</p>
      `;

        mainPrice += `  <p style="display: inline; text-decoration: line-through;" class="Product-Price">$${price}</p>
      <p style="display: inline;" class="Product-Price"><b>$${discountPrice}</b></p>`
        totalPrice += ` <p class="price float-price">$<span  id="total-${productId}">${discountPrice}</span><span id="incr-${productId}" style="display:none">${discountPrice}</span></p>`
    } else {
        popPrice += `<p class="price">Product Price :</p>
                <p class="price float-price">$${price}</p>
                <br></br>`;

        mainPrice += `  <p style="display: inline;" class="Product-Price">$${price}</p>`
        totalPrice += ` <p class="price float-price">$<span  id="total-${productId}">${price}</span><span id="incr-${productId}"  style="display:none">${price}</span></p>`
    }




    var productItem = `
      <div class="item">
        <div class="align-favourite">
         ${favIcon}
        </div>
        <a style="font-weight:300;color:black"   href='ProductPage.html?id=${productId}' rel='external'><img class="product-image-items-display" src="${image}" alt=" PS4" /></a>
      ${mainPrice}


        <a style="font-weight:300;color:black"  href='ProductPage.html?id=${productId}' rel='external'><p class="Product-Price Product-Name">${name}</p></a>
        <div class="align-addtocart">
          <div class="add-to-cart-button-div">
            <a href="#${productId}" data-rel="popup" data-position-to="window"
              class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                src="../Resources/images/icons/001-add White.png" border="0" /></a>
            <div data-role="popup" id="${productId}" data-theme="" class="ui-corner-all">
              <div style="padding:10px 20px; width: 200px;">
                            <h3 class="product-addtocart-popup">${name} </h3>
                ${popPrice}
                <br>
                <br>
                <p class="price">Quantity :</p>
                <button onclick="decrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')" class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                  data-theme="none">
                  <img class="product-popup-icon" src="../Resources/images/icons/002-substract.png" border="0"
                    width="35px" height="35px" />
                </button>
                <p class="price float-price" id="qty-${productId}">1</p>
                <button onclick="incrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')"  class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                  data-theme="none">
                  <img class="product-popup-icon" src="../Resources/images/icons/001-add.png" border="0" width="35px"
                    height="35px" />
                </button>
                <br>
                <br>
                <p class="price">Total :</p>
                  ${totalPrice}
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
        data: '{\n\t"email":"' + localStorage.email + '",\n\t"productId":"' +
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

function incrementQuantity(id, total, incr) {
    var currentQuantity = document
        .getElementById(id)
        .innerHTML.valueOf();
    var price = document
        .getElementById(total)
        .innerHTML.valueOf();
    price = parseInt(price)
    var incr = document
        .getElementById(incr)
        .innerHTML.valueOf();
    incr = parseInt(incr)
    price += incr;
    currentQuantity++;
    document.getElementById(id).innerHTML = currentQuantity;
    document.getElementById(total).innerHTML = price;

}

function decrementQuantity(id, total, incr) {
    var currentQuantity = document
        .getElementById(id)
        .innerHTML.valueOf();
    var price = document
        .getElementById(total)
        .innerHTML.valueOf();
    price = parseInt(price)
    var incr = document
        .getElementById(incr)
        .innerHTML.valueOf();
    incr = parseInt(incr)
    price -= incr;
    if (!(currentQuantity == 1)) {
        currentQuantity--;
        document.getElementById(id).innerHTML = currentQuantity;
        document.getElementById(total).innerHTML = price;
    }
}

function addToFav(id, image) {


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/addFavourite",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "35686857-d8f7-4365-83a3-369093e39814"
        },
        "processData": false,
        "data": "{\n\t\"email\":\"" + localStorage.email + "\",\n\t\"productId\":\"" + id + "\"\n}\n"
    }



    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response === 2009) {
            $(image).attr("src", "../Resources/images/icons/valentines-heart.png");
        }
    });

}

function removeFav(id, image) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/removeFav?id=" + id,
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "a358364a-c727-41d2-bdea-6ae464574bd8"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response === 2009) {
            $(image).attr("src", "../Resources/images/icons/heart%20(1).png");
        }
    });
}


function getFav() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/getFav?email=" + localStorage.email,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "0a1a48a6-bc98-4b3e-ad58-3da2ff13fcf5"
        }
    }

    $.ajax(settings).done(function(response) {
        for (var i = 0; i < response.length; i++) {
            fav.push(response[i].productId);
        }
        loadCategoryProducts();

    });
}