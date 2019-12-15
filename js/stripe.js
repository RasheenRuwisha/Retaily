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
    var form = document.querySelector('form');
    var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value,
        address_line1: form.querySelector('input[name=address-line1]').value,
        address_line2: form.querySelector('input[name=address-line2]').value,
        address_state: form.querySelector('input[name=address-state]').value,
        address_city: form.querySelector('input[name=address-city]').value,
        address_zip: form.querySelector('input[name=address-zip]').value,
    };
    stripe.createToken(card, extraDetails).then(setOutcome);
});



function chargeUser(token){
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
            "amount": sessionStorage.total * 100,
            "currency": "usd",
            "description": "Checkout by sheen.ruwisha@gmail.com",
            "source": token,
            "statement_descriptor": "Custom descriptor",
            "": ""
        }
    }

    $.ajax(settings).done(function (response) {
            alert("Payment Success")
    }).fail(function (jqXHR, textStatus) {
        alert("Payment failed")
    });
}



$(document).ready(function () {
  $("#price").html(sessionStorage.total)
});