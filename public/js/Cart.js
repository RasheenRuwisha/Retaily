var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: function (token) {
        console.log(token);
        fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                price: 1500
            })
        }).then(function(res) {
            return res.json()
        }).then(function(data) {
            alert(data.message)
        }).catch(function(error) {
            console.error(error)
        })
    }
})

function payAmount() {
    var price = "1500";

    stripeHandler.open({
        amount: price
    })
}