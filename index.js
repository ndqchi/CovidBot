const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

port = process.env.PORT || 3000;
app.listen(port, () => console.log("Webhook listening on port " + port));


const verifyController = require('./controllers/verification');
const webhookController = require('./controllers/messageWebhook');
//default get
app.get('/', verifyController);

//webhook
app.post('/', webhookController);