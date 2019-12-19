var product;
var fav = [];

$(document).ready(function() {
    $("#link-share").val(localStorage.getItem("email"));
    var pathname = window.location.pathname;
    product = getUrlParam("id", "Empty");
    product = product.split("%")[0];
    if (pathname.includes("favourite")) {
        loadCategoryProducts();
    }
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
    if(localStorage.email === undefined){
        window.location = ("Login.html")
    }else{
        $(".loader").css("display", "block");
        $(".products-items").css("display", "none");
        $("#drop-select").css("display", "none");

        var categories = "";

        try {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://retaily-api.herokuapp.com/getFav?email=" + localStorage.email,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache",
                    "Postman-Token": "441e902d-98ba-422d-8dfb-e1318729a41d"
                }
            }


            $.ajax(settings).done(function(response) {
                console.log(response);
                if(response.length >0 ){
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
                    $(".products-items").css("display", "grid");
                    $(".ui-content").append(`    <a class="checkout-btn-cart" href="#email" data-rel="popup">
                <button class="checkout-button-std-sht login-button ui-btn ui-btn-inline rounded-button">Email List</button>
            </a>
`)

                }else{
                    $(".products-items").css("display", "block");
                    categories +=  `  <div class="loader">
                    <img class="loader-gif" src="../images/ezgif.com-gif-maker.gif">
                    <p>This pupper is lonely because you have no favourites! Add some now...</p>
                </div>`
                }

                $(".loader").css("display", "none");
                $(".products-items").html(categories);
                $(".products-items").trigger("create");
            });
        } catch (err) {
            console.log("loadCategoryProducts failed");
            console.log(err);
        }
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
          <div onclick="removeFav('${localStorage.email}${productId}','#${productId}-fav-image')" class="add-to-cart-button-div style=" Style="background: none !important;">
              <img id="${productId}-fav-image" class="add-to-cart-plus-icon"
                  src="../images/icons/valentines-heart.png" border="0" />
            </div>
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
        data: '{\n\t"email":' + localStorage.email + ',\n\t"productId":"' +
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



$("#select-native-3").change(function() {
    var end = this.value;
    if (end == 1) {
        sortLowtoHigh()
    } else if (end == 2) {
        sortHighLow()
    }
});


function sendEmail(){
    $("#send-btn").css("display", "none");
    $("#processing-btn").addClass("processing-btn-important");
    var link = $("#link-share").val().trim();
    if(link === ""){
        $("#link-share").addClass("text-box-error");
    }else{
        $("#link-share").removeClass("text-box-error");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://retaily-api.herokuapp.com/emailFav?email="+localStorage.getItem("email")+"&senderEmail="+link,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "ae6d47ce-1660-4ecc-a50b-f828f3f40a98"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.length >0){
                toast("Email Sent!")
                $("#send-btn").css("display", "block");
                $("#processing-btn").removeClass("processing-btn-important");
            }

            $("#email").popup("close");
        });
    }

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
