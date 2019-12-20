var product;
var fav = [];

$(document).ready(function() {
    $("#drop-select").css("display", "none");
    var pathname = window.location.pathname;
    product = getUrlParam("id", "Empty");
    product = product.split("%")[0];
    getFav();
});


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function loadCategoryProducts() {
    $(".loader").css("display", "block");
    $(".products-items").css("display", "none");
    $("#drop-select").css("display", "none");

    var categories = "";

    try {
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://retaily-api.herokuapp.com/categoryProducts?category=Fashion",
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
                    response[i].hasDiscount,
                    response[i].productId,
                    response[i].discountPrice,
                );
            }
            $("#drop-select").css("display", "block");
            $(".loader").css("display", "none");
            $(".products-items").css("display", "grid");
            $(".hot-deals").html(categories);
            $("#drop-select").trigger("create");
            $(".hot-deals").trigger("create");

            categories = "";
            try {
                var settings = {
                    async: true,
                    crossDomain: true,
                    url: "https://retaily-api.herokuapp.com/categoryProducts?category=Food",
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
                            response[i].hasDiscount,
                            response[i].productId,
                            response[i].discountPrice,
                        );
                    }
                    $("#drop-select").css("display", "block");
                    $(".loader").css("display", "none");
                    $(".products-items").css("display", "grid");
                    $(".cattttt").html(categories);
                    $("#drop-select").trigger("create");
                    $(".cattttt").trigger("create");


                    categories = "";
                    try {
                        var settings = {
                            async: true,
                            crossDomain: true,
                            url: "https://retaily-api.herokuapp.com/categoryProducts?category=Games",
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
                                    response[i].hasDiscount,
                                    response[i].productId,
                                    response[i].discountPrice,
                                );
                            }
                            $("#drop-select").css("display", "block");
                            $(".loader").css("display", "none");
                            $(".products-items").css("display", "grid");
                            $(".best-seller").html(categories);
                            $("#drop-select").trigger("create");
                            $(".best-seller").trigger("create");
                            $(".dash-content").css("display", "block")

                        });
                    } catch (err) {
                        console.log("loadCategoryProducts failed");
                        console.log(err);
                    }

                });
            } catch (err) {
                console.log("loadCategoryProducts failed");
                console.log(err);
            }
        });
    } catch (err) {
        console.log("loadCategoryProducts failed");
        console.log(err);
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
                  src="../images/icons/valentines-heart.png" border="0" />
            </div>
        `
    } else {
        favIcon += `
         <div onclick="addToFav('${productId}','#${productId}-fav-image')" class="add-to-cart-button-div style=" Style="background: none !important;">
              <img style="z-index:998 !important;" id="${productId}-fav-image" class="add-to-cart-plus-icon"
                  src="../images/icons/heart%20(1).png" border="0" />
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
        <div class="item dashboard-item">
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
                  src="../images/icons/001-add White.png" border="0" /></a>
              <div data-role="popup" id="${productId}" data-theme="" class="ui-corner-all">
                <div style="padding:10px 20px; width: 200px;">
                              <h3 class="product-addtocart-popup">${name} </h3>
                  ${popPrice}
                  <br>
                  <br>
                  <p class="price">Quantity :</p>
                  <button onclick="decrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')" class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../images/icons/002-substract.png" border="0"
                      width="35px" height="35px" />
                  </button>
                  <p class="price float-price" id="qty-${productId}">1</p>
                  <button onclick="incrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')"  class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                    data-theme="none">
                    <img class="product-popup-icon" src="../images/icons/001-add.png" border="0" width="35px"
                      height="35px" />
                  </button>
                  <br>
                  <br>
                  <p class="price">Total :</p>
                    ${totalPrice}
                    <div class=" button-container">
                    <button onclick=addToCart("${productId}") type="submit" class="login-button ui-btn ui-btn-inline rounded-button" id='btn-${productId}'>Add to Cart</button>
                    <div id="processing-btn-${productId}" onclick="addReview()"
                     class="ui-btn ui-shadow ui-corner-all login-processing login-button" style="grid-template-columns: 11% 51%;">
                    <img src="../images/loader.gif"
                         style="display: inline-block;width: 33px;height: 33px;" alt="">
                    <p class="processing-text">Processing</p>
                </div>
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
    $(`#btn-${productid}`).css("display", "none");
    $(`#processing-btn-${productid}`).addClass("processing-btn-important");


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
        $(`#${productid}`).popup("close");
        if (response === 2005) {
            $(`#${productid}`).on({
                popupafterclose: function() {
                    setTimeout(function() { $("#cart-success-message").popup('open') }, 100);
                }
            });
            setTimeout(function() {
                $("#cart-success-message").popup("close");
            }, 2000);
        } else if (response === 3006) {
            $(`#${productid}`).on({
                popupafterclose: function() {
                    setTimeout(function() { $("#cart-error").popup('open') }, 100);
                }
            });
            setTimeout(function() {
                $("#cart-error").popup("close");
            }, 2000);
        }
        $(`#btn-${productid}`).css("display", "block");
        $(`#processing-btn-${productid}`).removeClass("processing-btn-important");
    }).error(function() {
        $(`#${productid}`).on({
            popupafterclose: function() {
                setTimeout(function() { $("#cart-error").popup('open') }, 100);
            }
        });
        setTimeout(function() {
            $("#cart-error").popup("close");
        }, 2000);
        $(`#btn-${productid}`).css("display", "block");
        $(`#processing-btn-${productid}`).removeClass("processing-btn-important");
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
            $(image).attr("src", "../images/icons/valentines-heart.png");
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
            $(image).attr("src", "../images/icons/heart%20(1).png");
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



function filterApply() {
    var choice = ($("input[name=radio-choice-1]:checked").val());
    $("#filter-popup").popup("close");
    if (choice === "low-to-high") {
        sortLowtoHigh()
    } else if (choice === "high-to-low") {
        sortHighLow()
    } else if (choice === "none") {
        loadCategoryProducts();
    }
}