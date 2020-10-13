const axios = require('axios');

const fetchData = (message) => {
    return new Promise((resolve, reject) => {
        let location = message.split(" ")[0];
        let url;
        if (location === 'Global') {
            url = "https://api.covid19api.com/world/total";
            axios
            .get(url)
            .then((res) => {
                let data = res.data;
                if (data.message && data.message === 'Not found') {
                    message = "Oh no! Data not found!"
                }
                else {
                    message = `Total Confirmed: ${data['TotalConfirmed']}, ` +
                            `Total Deaths: ${data['TotalDeaths']}, ` +
                            `Total Recovered: ${data['TotalRecovered']}, ` +
                            `Updated Time: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
                                .format(new Date())}`;
                }
                resolve();
            })
            .catch(e => reject(e));
        }
        else {
            url = "https://api.covid19api.com/total/country/" + location;
            axios
            .get(url)
            .then((res) => {
                let raw = res.data;
                if (raw.message && raw.message === 'Not Found') {
                    message = "Data not found";
                }
                else {
                    data = raw[raw.length - 1];
                    message = `Country: ${data['Country']}, ` + 
                            `Confirmed: ${data['Confirmed']}, ` +
                            `Deaths: ${data['Deaths']}, ` +
                            `Recovered: ${data['Recovered']}, ` +
                            `Updated Time: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
                                .format(new Date(data['Date']))}`;
                }
                resolve();
            })
            .catch(e => reject(e));
        }
    });
};

module.exports = fetchData;
