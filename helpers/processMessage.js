const { FACEBOOK_ACCESS_TOKEN, WITAI_TOKEN } = require('../config');
const { Wit } = require('node-wit');
const axios = require('axios');
const fetchData = require('./fetchData');
const { welcomeMessage, byeMessage, encouragingMessage, fallbackMessage, CONFIDENCE_THRESHOLD} = require('./constants');

const sendTextMessage = (senderId, text) => {
    axios({
        url: "https://graph.facebook.com/v2.6/me/messages",
        method: 'POST',
        data: {
            recipient: {id: senderId},
            message: {text}
        },
        headers: { "Authorization": "Bearer "+ FACEBOOK_ACCESS_TOKEN}
    });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const client = new Wit({ accessToken: WITAI_TOKEN });
    client
    .message(message)
    .then((res) => {
        if (res.traits.wit$bye)
            sendTextMessage(senderId, byeMessage[Math.floor((Math.random() * 6))]);
        else if (res.traits.wit$greetings)
            sendTextMessage(senderId, welcomeMessage[Math.floor((Math.random() * 2))]);
        else if (res.traits.wit$sentiment && res.traits.wit$sentiment[0].value == 'negative') {
            if (res.traits.wit$sentiment.confidence > CONFIDENCE_THRESHOLD)
                sendTextMessage(senderId, encouragingMessage[Math.floor((Math.random() * 3))])
            else
                sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);
        }
        else if (res.intents[0].name == 'getCovidStatus' && res.entities['wit$location:location']) {
            let location = res.entities['wit$location:location'][0].resolved.values[0].external.wikipedia;
            if (location) {
                console.log("location: "+ location);
                let info = {location: location.toLowerCase().replace(" ","-")};
                fetchData(info)
                .then(() => {
                    console.log("response: " + info.response);
                    const response = info.response.length > 0 ? info.response : fallbackMessage[Math.floor((Math.random() * 3))];
                    sendTextMessage(senderId, response);
                })
                .catch((e) => {
                    console.log(e)
                    sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);
                });
            } else
                sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);
        }
        else if (res.intents[0].name == 'getCovidStatus'&& res.entities['global:global']) {
            let info = {location: "global"};
            console.log("location: "+ global);
            fetchData(info)
            .then(() => {
                console.log("response: " + info.response);
                const response = info.response;
                sendTextMessage(senderId, response);
            })
            .catch((e) => {
                console.log(e);
                sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);
            });
        }
        else{
            console.log("fallback");
            sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);}
    })
    .catch((e) => {
        console.log(e);
        sendTextMessage(senderId, fallbackMessage[Math.floor((Math.random() * 3))]);
    });
}