var stripe = Stripe('pk_test_hbVqKIGrVeFjkfdVRU1e3Wtc00MiakiPdZ');
var elements = stripe.elements({
    fonts: [
        {
            family: 'Open Sans',
            weight: 400,
            src: 'local("Open Sans"), local("OpenSans"), url(https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3ZBw1xU1rKptJj_0jans920.woff2) format("woff2")',
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
        },
    ]
});

var card = elements.create('card', {
    hidePostalCode: true,
    style: {
        base: {
            iconColor: '#F99A52',
            color: '#32315E',
            lineHeight: '48px',
            fontWeight: 400,
            fontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", sans-serif',
            fontSize: '15px',

            '::placeholder': {
                color: '#CFD7DF',
            }
        },
    }
});
card.mount('#card-element');

function setOutcome(result) {

    if (result.token) {
        chargeUser(result.token.id);

    } else if (result.error) {

    }
}

card.on('change', function(event) {
    setOutcome(event);
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    if(doValidations()){
        var form = document.querySelector('form');
        localStorage.setItem("checkoutName",$("#cardholder-name").val());
        localStorage.setItem("checkoutEmail",$("#cardholder-email").val());

        var extraDetails = {
            name: form.querySelector('input[name=cardholder-name]').value,
            email: form.querySelector('input[name=cardholder-email]').value,
            address_line1: form.querySelector('input[name=cardholder-address]').value,
            address_zip: form.querySelector('input[name=cardholder-postalcode]').value,
            address_state: form.querySelector('input[name=cardholder-state]').value,
            address_city: form.querySelector('input[name=cardholder-city]').value,
            address_country: form.querySelector('input[name=cardholder-country]').value,
        };
        stripe.createToken(card, extraDetails).then(setOutcome);
    }
});



function chargeUser(token){
    $("#pay-btn").addClass("hide-payment-btn");
    $("#processing-btn").addClass("processing-btn-important");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.stripe.com/v1/charges?key=sk_test_UErVLRDhFKCtj3Zj5fU7DKT8008mCYPvRt",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "058190e0-a2fb-462f-abdf-50f5612ffc77"
        },
        "data": {
            "amount": localStorage.total * 100,
            "currency": "usd",
            "description": "Checkout by "+localStorage.email,
            "source": token,
            "statement_descriptor": "Custom descriptor",
            "": ""
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        loadCart();
        $("#Name").text(localStorage.checkoutName);
        $("#Addres-Line-1").text(response.source.address_line1);
        $("#Addres-Line-2").text(response.source.address_state + ", " + response.source.address_city);
        $("#Addres-Line-3").text(response.source.address_country + "," + response.source.address_zip);
        $("#Email").text(localStorage.checkoutEmail);

        $("#Card").text(response.source.last4);

        $("#checkokut-form").css("display","none");
        $("#checkout-success").css("display","block");
        $("#payment-btn").css("display", "block");
        $("#processing-btn").removeClass("processing-btn-important");
    }).fail(function (jqXHR, textStatus) {
        $("#cart-error").popup("open");
        setTimeout(function() {
            $("#cart-error").popup("close");
        }, 2000);
        $("#pay-btn").removeClass("hide-payment-btn");
        $("#processing-btn").removeClass("processing-btn-important");
    });
}



$(document).ready(function () {
  $("#price").html(localStorage.total)
});



function loadCart() {
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
        console.log(response);
        if (response.cartItemsList.length > 0) {
            for (var i = 0; i < response.cartItemsList.length; i++) {
                categories += addProducts(response.cartItemsList[i]);
            }
            removeCart();
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
<div class="">
    <div class="order-item-image">
    <img class="order-product product-image-items-display" src="${response.productImage}" alt=" PS4" style="width:70%; float: left;" />
    </div>
    <div class="order-item-text width-73">
    <p style="margin-top: 2px;"><b>${response.name}</b></p>
<p class="price">Product Price :</p>
<p class="price float-price">$ ${response.price}</p>
    <br>
    <p class="price">Quantity :</p>
<p class="price float-price">${response.qty}</p>
    <br>

    </div>
    </div>
        `;

        return productItem;
    } catch (err) {
        console.log(err);
        console.log("addProducts failed");
    }
}



function removeCart(){
    localStorage.total = 0;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://retaily-api.herokuapp.com/removeAllCart?email="+localStorage.email,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "1da53742-d26b-4263-b87e-55f462df6d95"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}


function doValidations(){
    var name = $("#cardholder-name").val().trim();
    var email = $("#cardholder-email").val().trim();
    var addressline2 = $("#cardholder-address").val().trim();
    var state = $("#cardholder-state").val().trim();
    var city = $("#cardholder-city").val().trim();

    if (name === "") {
        $("#cardholder-name").addClass("text-box-error");
        $("#card-name-error").css("display","inline")
        $("#card-name-label").css("display","none")
    } else {
        $("#card-name").removeClass("text-box-error")
        $("#card-name-error").css("display","none")
        $("#card-name-label").css("display","inline")
    }

    if (email === "") {
        $("#card-email").addClass("text-box-error")
        $("#card-email-error").css("display","inline")
        $("#card-email-label").css("display","none")
    } else {
        $("#card-email").removeClass("text-box-error")
        $("#card-email-error").css("display","none")
        $("#card-email-label").css("display","inline")
    }


    if (addressline2 === "") {
        $("#card-address-line-2").addClass("text-box-error")
        $("#card-address-line-2-error").css("display","inline")
        $("#card-address-line-2-label").css("display","none")
    } else {
        $("#card-address-line-2").removeClass("text-box-error")
        $("#card-address-line-2-error").css("display","none")
        $("#card-address-line-2-label").css("display","inline")
    }



    if (state === "") {
        $("#card-address-state").addClass("text-box-error")
        $("#card-address-state-error").css("display","inline")
        $("#card-address-state-label").css("display","none")
    } else {
        $("#card-address-state").removeClass("text-box-error")
        $("#card-address-state-error").css("display","none")
        $("#card-address-state-label").css("display","inline")
    }


    if (city === "") {
        $("#card-address-city").addClass("text-box-error")
        $("#card-address-city-error").css("display","inline")
        $("#card-address-city-label").css("display","none")
    } else {
        $("#card-address-city").removeClass("text-box-error")
        $("#card-address-city-error").css("display","none")
        $("#card-address-city-label").css("display","inline")
    }

    if(name !== "" && email !== "" && addressline2 !== "" && city !== "" && state !== ""){
      return true;
    }else{
        return false;
    }
}