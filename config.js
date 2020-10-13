if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const result = dotenv.config();
    console.log(process.env.NODE_ENV);
    if (result.error)
        throw result.error;
    const { parsed: envs } = result;
    console.log(envs);
    module.exports = envs;
}
