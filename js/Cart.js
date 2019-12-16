$(document).ready(function () {
    var pathname = window.location.pathname;
    if (pathname.includes("Cart")) {
        loadCart();
    }
});

function loadCart() {
    $(".header-title").html(sessionStorage.category);

    var categories = "";

    var settings = {
        async: true,
        crossDomain: true,
        url:
            "https://retaily-api.herokuapp.com/getCart?email=sheen.ruwisha@gmail.com",
        method: "GET",
        headers: {
            "cache-control": "no-cache",
            "Postman-Token": "e029cdb2-7f8f-4b48-b4c6-d56a44dfa180"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.cartItemsList.length > 0) {
            for (var i = 0; i < response.cartItemsList.length; i++) {
                categories += addProducts(response.cartItemsList[i]);
            }
        }else {
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
        $("#btn-checkout").html(`    <div class="checkout-btn-cart">
                <button onclick="proceedToPayment()" class="login-button ui-btn ui-btn-inline rounded-button">Pay $<span id="price">${response.total}</span></button>
                `);
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

    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response === 2006) {
            loadCart();
        }
    });
}

function proceedToPayment() {
    window.location = "payment.html"
    sessionStorage.total = $("#price").text();
}
