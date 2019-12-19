var applycount = 0;
$(document).ready(function() {
    var pathname = window.location.pathname;
    if (pathname.includes("Cart")) {
        loadCart();
    }
});

function loadCart() {
    $(".header-title").html(localStorage.category);

    var categories = "";

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://retaily-api.herokuapp.com/getCart?email="+localStorage.email,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
            "Postman-Token": "e029cdb2-7f8f-4b48-b4c6-d56a44dfa180"
        }
    };

    $.ajax(settings).done(function(response) {
        localStorage.total = response.total;
        console.log(response);
        if (response.cartItemsList.length > 0) {
            for (var i = 0; i < response.cartItemsList.length; i++) {
                categories += addProducts(response.cartItemsList[i]);
            }
            $("#btn-checkout").html(`
                            <div class="payment-button-div">  
                            <div class="checkout-btn-cart">
                            <a href="#coupons-pop" data-rel="popup" class="login-button ui-btn ui-btn-inline rounded-button">
                            <img class="coupons" src="../images/icons8-ticket-100.png" alt="">
                            </a>
                            </div>
                            </div>
                            <div class="payment-button-div">  
                            <div class="checkout-btn-cart">
                            <button onclick="proceedToPayment()" class="login-button ui-btn ui-btn-inline rounded-button">
                            <p class="this-will-work "> Total : $<span id="price" s>${response.total}</span></p> 
                            <p class="payment-button0pay-label">CheckOut ></p>
                            </button>
                            </div>
                            </div>
            `);
        } else {
            categories += `
                 <div class="loader">
                    <img class="loader-gif" src="../images/ezgif.com-gif-maker.gif">
                    <p>This pupper is lonely because you have no items in cart! Add some now...</p>
                </div>
                `
        }


        $("#price").html(response.total);
        $(".loader").remove();
        $(".order-main").html(categories);
        $(".order-main").trigger('create');

    });
}

function addProducts(response) {

    try {
        var productItem = `
<div class="order-item">
    <div class="order-item-image">
    <img class="order-product product-image-items-display" src="${response.productImage}" alt=" PS4" style="width:70%; float: left;" />
    </div>
    <div class="order-item-text">
    <p style="margin-top: 2px;"><b>${response.name}</b></p>
<p class="price">Product Price :</p>
<p class="price float-price">$ ${response.price}</p>
    <br>
    <p class="price">Quantity :</p>
<p class="price float-price">${response.qty}</p>
    <br>
    <button onclick="removeCartItem('${response.id}')" class="remove-from-cart" data-role="button" data-shadow="false" data-theme="none">
    Remove
    </button>

    </div>
    </div>
        `;

        return productItem;
    } catch (err) {
        console.log(err);
        console.log("addProducts failed");
    }
}

function removeCartItem(id) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://retaily-api.herokuapp.com/removeCart?id=" + id,
        method: "GET",
        headers: {
            "cache-control": "no-cache",
            "Postman-Token": "1a2a59f4-16b1-481a-aa97-0cce767a1092"
        }
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response === 2006) {
            loadCart();
        }
    });
}

function proceedToPayment() {
    window.location = "payment.html"
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

function ApplyCoupons(){
    if(applycount == 0){
        localStorage.total = parseInt(localStorage.total) * 0.50;
        $("#price").text(localStorage.total);
        $("#price").text(localStorage.total);
        $("#coupons-pop").popup("close");
        applycount+=1;
        toast("Coupon Applied");
    }else{
        $("#coupons-pop").popup("close");
        toast("Coupon Already Applied")
    }

}

