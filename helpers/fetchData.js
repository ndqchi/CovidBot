const axios = require('axios');

const fetchData = (info) => {
    return new Promise((resolve, reject) => {
        let location = info.message.split(" ")[0];
        let url;
        if (location === 'Global') {
            url = "https://api.covid19api.com/world/total";
            axios
            .get(url)
            .then((res) => {
                let data = res.data;
                if (data.length === 0) {
                    info.response = "Oh no! Data not found! Please try again with another country!";
                }
                else {
                    info.response = `Global status, Total Confirmed: ${data['TotalConfirmed']}, ` +
                            `Total Deaths: ${data['TotalDeaths']}, ` +
                            `Total Recovered: ${data['TotalRecovered']}`;
                }
                resolve();
            })
            .catch(e => {
                info.response = "Oh no! Data not found! Please try again with another country!";
                reject(e);
            });
        }
        else {
            url = "https://api.covid19api.com/total/country/" + location;
            axios
            .get(url)
            .then((res) => {
                let raw = res.data;
                if (raw.length === 0) {
                    info.response = "Oh no! Data not found! Please try again with another country!";
                }
                else {
                    data = raw[raw.length - 1];
                    info.response = `Country: ${data['Country']}, ` + 
                            `Confirmed: ${data['Confirmed']}, ` +
                            `Deaths: ${data['Deaths']}, ` +
                            `Recovered: ${data['Recovered']}, ` +
                            `Updated Time: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
                                .format(new Date(data['Date']))}`;
                }
                resolve();
            })
            .catch(e => {
                info.response = "Oh no! Data not found! Please try again with another country!";
                reject(e);
            });
        }
    });
};

module.exports = fetchData;
