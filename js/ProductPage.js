var product;
$(document).ready(function() {
    var pathname = window.location.pathname;
    $("#link-share").val(window.location)
    if (pathname.includes("ProductPage")) {
        product = getUrlParam("id", "Empty");
        product = product.split("%")[0];
        loadProduct();
        loadReviews();
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

function loadReviews() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/getReviews?productId=" +
            product,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "02d4562d-1b2e-4a07-aa2f-f546e0a0aa3d"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
        var reviews = "";
        for (var i = 0; i < response.length; i++) {
            reviews += `<div class="comment-section-background">
                <img class="comment-user-icon  product-popup-icon" src="../images/icons/header-userprofile.png"
            border="0"/>
                <p class=" price"><b>${response[i].email}</b></p>
            <br>
            <img class="comment-rating-icon  product-popup-icon" src="../images/icons/Stars png.png"
            border="0"/>
                <br>
                <p class="comment-title price review-title"><b>${response[i].title}</b></p>
            <br>
            <p class="comment-description review-comment">${response[i].comment}
                </p>

                </div>`
        }
        $("#reviews").html(reviews);
        $("#reviews").trigger("create");
        $("#content").css("display", "block");
        $(".loader").remove();
    });
}

function loadProduct() {
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://retaily-api.herokuapp.com/product?productId=" +
            product,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
            "Postman-Token": "2203e45e-76d4-4929-bd85-9a0b33a0c78f"
        }
    };

    $.ajax(settings).done(function(response) {
        var product = "";
        product += addProducts(response);

        $(".products-item").html(product);
        $(".products-item").trigger("create");
        addProducts();
        initSlider();
    });
}

function addProducts(response) {
    var images = "";
    var dots = "";


    var popPrice = "";


    if (response.hasDiscount) {
        popPrice += `
        <p class="single-product price">Product Price :</p>
                    <p class="single-product price float-price">$${response.price}</p>
                    <br>
                    <p class="single-product price">Promotion Price :</p>
                    <p class="single-product price float-price">$${response.discountPrice}</p>
        `;

    } else {
        popPrice += ` <p class="single-product price">Product Price :</p>
        <p class="single-product price float-price">$ ${response.price}</p>
        <br>`;

    }


    for (var i = 0; i < response.image.length; i++) {
        images += `
            <img
                        class="mySlides  prd-image "
                        src=${response.image[i]}
                        style="width:100%"
                />
            `;

        dots += ` <span
                            class="w3-badge demo w3-border w3-transparent w3-hover-white"
                            onclick="currentDiv(i)"
                    ></span>`;
    }

    var productItem = `
        <div class="product-title-slideshow-container">
                <p class="single-product-page-title">${response.name}</p>

                <div class="single-product-background w3-content w3-display-container">
                   ${images}
                   
               
 ${dots}
                    </div>
                </div>
            </div>

            <div class="single-product product-details-container">
                <p>
                     ${response.description}
                </p>

                <div>
                   

        ${popPrice}

                    <br>
                    <p class="single-product single-product-margin price">Quantity :</p>
                    <button class="plus-icon btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false" data-theme="none" onclick="incrementQuantity()">
            <img class="single-product single-product-margin  product-popup-icon" src="../images/icons/001-add.png" border="0"
              width="35px" height="35px" />
          </button>
                    <p id="productQuantity" class="quantity-label single-product single-product-margin price float-price">1</p>

                    <button class="minus-icon btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false" data-theme="none" onclick="decrementQuantity()">
            <img class="single-product single-product-margin product-popup-icon" src="../images/icons/002-substract.png" border="0"
              width="35px" height="35px" />
          </button>
                </div>

                <button onclick="addToCart('${response.productId}')">Add to cart</button>
            </div>
        `;

    return productItem;
}


function addReview(response) {

    var reviewItem =
        `
         
        `

    return reviewItem;
}

function initSlider() {
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs((slideIndex += n));
    }

    function currentDiv(n) {
        showDivs((slideIndex = n));
    }

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > x.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = x.length;
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
    showDivs((slideIndex += n));
}

function currentDiv(n) {
    showDivs((slideIndex = n));
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
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

function incrementQuantity() {
    var currentQuantity = document
        .getElementById("productQuantity")
        .innerHTML.valueOf();
    currentQuantity++;
    document.getElementById("productQuantity").innerHTML = currentQuantity;
}

function decrementQuantity() {
    var currentQuantity = document
        .getElementById("productQuantity")
        .innerHTML.valueOf();
    if (!(currentQuantity == 1)) {
        currentQuantity--;
        document.getElementById("productQuantity").innerHTML = currentQuantity;
    }
}

function addToCart(productid) {
    if(localStorage.email === undefined){
        $("#cart-error").popup("open");
        setTimeout(function() {
            $("#cart-error").popup("close");
        }, 2000);
    }else{
        var value = $("#productQuantity").text();

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
                $("#cart-success").popup("open");
                setTimeout(function() {
                    $("#cart-success").popup("close");
                }, 2000);
            } else if (response === 3006) {
                $("#cart-error").popup("open");
                setTimeout(function() {
                    $("#cart-error").popup("close");
                }, 2000);
            }
        }).error(function() {
            toast("Please Login to continue...");
            window.location = "Login.html";
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


function addReviewProduct() {
    $("#add-review").popup("open");
}


function addReview() {
    $("#add-review-btn").css("display", "none");
    $("#processing-btn").addClass("processing-btn-important");

    var title = $("#title").val().trim();
    var review = $("#review").val().trim();

    if (title === "") {
        $("#title").addClass("text-box-error")
    } else {
        $("#title").removeClass("text-box-error")
    }

    if (review === "") {
        $("#review").addClass("text-box-error")
    } else {
        $("#review").removeClass("text-box-error")
    }


    if (review !== "" && title !== "") {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://retaily-api.herokuapp.com/addReview",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
                "Postman-Token": "2d243d6a-6eca-4124-ac3c-1a4c84cf7fac"
            },
            "processData": false,
            "data": "{\n\t\"email\":\"" + localStorage.email + "\",\n\t\"productId\":\"" + product + "\",\n\t\"rating\": 4,\n\t\"comment\":\"" + review + "\",\n\t\"title\":\"" + title + "\"\n}"
        }

        $.ajax(settings).done(function(response) {
            console.log(response);
            $("#add-review").popup("open");
            setTimeout(function() {
                $("#add-review").popup("close");
            }, 2000);
            location.reload();
        }).error(function() {
            $("#add-review").popup("open");
            setTimeout(function() {
                $("#add-review").popup("close");
            }, 2000);
        });

    }
    $("#processing-btn").removeClass("processing-btn-important");
    $("#add-review-btn").css("display", "block");

}

