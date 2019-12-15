const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_NKKtnsoFg4ilg3s3mHp9Rhho00Hx7vv9LK');

app.use(express.json());
app.use(express.static('public'));

app.post('/purchase', function (req, res) {
    console.log(req.body);
    stripe.charges.create({
        amount: req.body.price,
        source: req.body.stripeTokenId,
        currency: 'usd'
    }).then(function () {
        console.log('Charge Successful')
        res.json({ message: 'Successfully purchased items' })
    }).catch(function () {
        console.log('Charge Fail')
        res.status(500).end()
    })
})

app.listen(3000);