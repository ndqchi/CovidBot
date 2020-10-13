const { VERIFY_TOKEN } = require('../config')
module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];

    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === VERIFY_TOKEN);

    if (hubMode && verifyTokenMatches)
        res.status(200).send(hubChallenge);
    else if (hubMode && !verifyTokenMatches)
        res.status(403).end();
    else
        res.status(200).end('<html><body><h1>This is the Express Server for Covid19 Bot</h1></body></html>');

};