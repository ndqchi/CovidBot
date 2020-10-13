const { FACEBOOK_ACCESS_TOKEN, DIALOGFLOW_TOKEN } = require('../config');
const dialogflow = require('@google-cloud/dialogflow');
const axios = require('axios');

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
    console.log(text);
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    // const sessionClient = new dialogflow.SessionsClient();
    // const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    // const request = {
    //     session: sessionPath,
    //     queryInput: {
    //         text: {
    //             text: message,
    //             languageCode: 'en-US',
    //         },
    //     },
    // };
    // const responses = await sessionClient.detectIntent(request);
    // const result = responses[0].queryResult;
    // sendTextMessage(senderId, result.queryText);
    sendTextMessage(senderId, "Hi there");
}