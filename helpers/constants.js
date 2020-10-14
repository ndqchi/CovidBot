const CONFIDENCE_THRESHOLD = 0.6;
const encouragingMessage = [
    "Hey! Don't feel so down! We are all in this together. I'm sure we can overcome it soon!",
    "Don't worry my friend! Everything will turn out well! Let's believe in human capabilities!",
    "Cheer up! I believe that with unity, humans can win against any diseases or evils!"
];
const fallbackMessage = [
    "Sorry! What was that? Can you try again with something like 'Global covid status' or '<some country> status'?",
    "I don't really understand! :( Mind trying again?",
    "Hmm... I don't get it... But I will always be here for you! Shall we try again with more common terms?"
];
const byeMessage = [
    "Goodbye! Great talk with you! Please stay safe, especially during this Covid19.",
    "Nice time chatting with you! Wish you well during this epidemic! Bye bye!",
    "You have to go now :(? Wish I can talk to you more! See you! Stay safe!",
    "Seeya! Hope I can provide you useful info! Remember to stay safe!",
    "Byebye! Hope to see you again. Wish you great health.",
    "Take care! You can come back to me whenever you like! I am always here!"
];
const welcomeMessage = [
    "Hi there! I am Covid19 chatbot. " +
    "You can ask me about the latest Covid19 situation around the world. " +
    "Some examples to give you a feel: 'Tell me about Covid19 status in <country>/globally', " +
    "or simply 'Worldwide/<country> status'",
    "Hey! I am a chatbot that provides information about global and local Covid19 situation. "+
    "Here are some common questions I get asked: 'Singapore covid19 status', 'What is covid situation in Germany?' or " +
    "'How is covid19 globally?'"
];
module.exports = {
    CONFIDENCE_THRESHOLD: CONFIDENCE_THRESHOLD,
    welcomeMessage: welcomeMessage,
    byeMessage: byeMessage,
    encouragingMessage: encouragingMessage,
    fallbackMessage: fallbackMessage
};