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
    var message = event.message.text;
    const welcomeMessage = "Hi there! I am a chatbot that provides latest Covid19 status. "
    "You can enter 'Global status' or '<country> status' to get the information you need!";
    const fallbackMessage = "Sorry! What was that? Can you try again with 'Global status' or '<country> status'?";

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
    if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello"))
        sendTextMessage(senderId, welcomeMessage);
    else if (message.toLowerCase().includes("status")){
        fetchData(message)
        .then(() => {
            const response = message
            sendTextMessage(senderId, response);
        })
        .catch(e => {
            console.log(e)
        });
    }
    else
        sendTextMessage(senderId, fallbackMessage);
}