const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'pug')

app.use('/', express.static( __dirname + '/dist'))

app.get('/', (req, res) => res.render('index'))

app.get('/.well-known/acme-challenge/VwBy86OeMRrmRwziEZ6UTcYFJQzqQsBecVidF0jC2Hc', function(req, res) {
    res.send('VwBy86OeMRrmRwziEZ6UTcYFJQzqQsBecVidF0jC2Hc.P-nISRLKrfFIzO2T29KnXqBEDoG82tLLzpPbm7R6htE')
})

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
