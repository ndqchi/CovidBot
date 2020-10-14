if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const result = dotenv.config();
    if (result.error)
        throw result.error;
    const { parsed: envs } = result;
    module.exports = envs;
}
else {
    const envs = {
        FACEBOOK_ACCESS_TOKEN: process.env.FACEBOOK_ACCESS_TOKEN,
        WITAI_TOKEN: process.env.WITAI_TOKEN,
        VERIFY_TOKEN: process.env.VERIFY_TOKEN
    }
    module.exports = envs
}
