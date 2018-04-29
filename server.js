const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))


// The following two endpoints are so that the browser can load the HTML and Javascript
app.get('/', (req, res) => res.send(fs.readFileSync('./public/index.html').toString()))
app.get('/app.js', (req, res) => res.send(fs.readFileSync('./public/app.js').toString()))

// 
let serverState = {
    items: {}
}

app.post('/items', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    let listName = parsedBody.listName;
    let items = serverState.items[listName];
    if(!items) items = []
    res.send(JSON.stringify(items));
})

app.post('/addItem', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    // The following could be rewritten in a shorter way using push.
    // I'm trying to ween everyone off of push
    serverState.items[listName] = serverState.items[listName].concat(parsedBody.item)
    res.send(JSON.stringify(serverState.items));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
