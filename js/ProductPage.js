
$(document).ready(function () {


    var categories = "";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/productCategory",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for(var i = 0; i< response.length; i++){
            categories += addProducts(response[i].name, response[i].price, response[i].image, response[i].name)
        }
        $(".products-items").html(categories);
    });
});



function addProducts(name, price, image, promotion, ){

    var productItem =

        `
        <div class="item">
                <div class="align-favourite">
                    <div class="add-to-cart-button-div style=" Style="background: none !important;">
                        <a href="#popupLogin" data-rel="popup" data-position-to="window"
                           class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                                                                                                     src="../Resources/images/icons/heart (1).png" border="0" /></a>  
                    </div>
                </div>
                <img class="product-image-items-display" src="${image}" alt=" PS4"
                     style="width:100%" />
                <p style="display: inline; text-decoration: line-through;" class="Product-Price">$ ${price}</p>
                <p style="display: inline;" class="Product-Price"><b>$399</b></p>
                <p class="Product-Price Product-Name">${name}</p>
                <div class="align-addtocart">
                    <div class="add-to-cart-button-div">
                        <a href="#popupLogin" data-rel="popup" data-position-to="window"
                           class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                                                                                                     src="../Resources/images/icons/001-add White.png" border="0" /></a>
                        <div data-role="popup" id="popupLogin" data-theme="" class="ui-corner-all">
                            <div style="padding:10px 20px; width: 200px;">
                                            <h3 class="product-addtocart-popup">PlayStation 4 </h3>
                                <p class="price">Product Price :</p>
                                <p class="price float-price">$400</p>
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


function initSlider(){
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function currentDiv(n) {
        showDivs(slideIndex = n);
    }

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > x.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" w3-white", "");
        }
        x[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " w3-white";
    }
}


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-white";
}

