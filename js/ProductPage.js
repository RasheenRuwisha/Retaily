$(document).ready(function () {
    var pathname = window.location.pathname;
    if(pathname.includes("ProductPage")){
        loadProduct()
    }

});


function loadProduct(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/product?productId=" + sessionStorage.product,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "2203e45e-76d4-4929-bd85-9a0b33a0c78f"
        }
    }

    $.ajax(settings).done(function (response) {

        var product = "";
        product+= addProducts(response);

        $(".products-item").html(product);
        $(".products-item").trigger('create');
        addProducts();
        initSlider();
    });
}

function addProducts(response) {

    var images = '';
    var dots = '';

    for (var i = 0; i < response.image.length; i++) {
        images += `
            <img
                        class="mySlides"
                        src=${response.image[i]}
                        style="width:100%"
                />
            `;

        dots += ` <span
                            class="w3-badge demo w3-border w3-transparent w3-hover-white"
                            onclick="currentDiv(i)"
                    ></span>`

    }


    var productItem =

        `
        <div class="product-title-slideshow-container">
                <p class="single-product-page-title">${response.name}</p>

                <div class="single-product-background w3-content w3-display-container">
                   ${images}
                   
                    <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:80%">
                        <div class="w3-left w3-hover-text-khaki" onclick="plusDivs(-1)">
                            &#10094;
                        </div>
                        <div class="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">
                            &#10095;
                        </div>
 ${dots}
                    </div>
                </div>
            </div>

            <div class="single-product product-details-container">
                <p>
                     ${response.description}
                </p>

                <div>
                    <p class="single-product price">Product Price :</p>
                    <p class="single-product price float-price">$ ${response.price}</p>
                    <br>
                    <p class="single-product price">Promotion Price :</p>
                    <p class="single-product price float-price">$399</p>
                    <br>
                    <br>
                    <p class="single-product price">Quantity :</p>
                    <button class="single-product-page btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false" data-theme="none">
            <img class="single-product  product-popup-icon" src="../Resources/images/icons/001-add.png" border="0"
              width="35px" height="35px" />
          </button>
                    <p class="single-product price float-price">1</p>
                    <button class="single-product-page btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false" data-theme="none">
            <img class="single-product product-popup-icon" src="../Resources/images/icons/002-substract.png" border="0"
              width="35px" height="35px" />
          </button>
                </div>

                <button>Add to cart</button>
            </div>
        `

    return productItem;
}


function initSlider() {
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
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
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
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-white";
}

