const axios = require('axios');

const fetchData = (info) => {
    return new Promise((resolve, reject) => {
        let location = info.location;
        let url;
        if (location === 'global') {
            url = "https://api.covid19api.com/summary";
            axios
            .get(url)
            .then((res) => {
                let data = res.data;
                if (data.length === 0) {
                    info.response = "Oh no! Data not found! Please try again with another country!";
                }
                else {
                    data = data.Global;
                    info.response = `Global status, Total Confirmed: ${data['TotalConfirmed']} (+${data['NewConfirmed']}), ` +
                            `Total Deaths: ${data['TotalDeaths']} (+${data['NewDeaths']}), ` +
                            `Total Recovered: ${data['TotalRecovered']} (+${data['NewRecovered']})`;
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
                    data_prev = raw[raw.length - 2];
                    info.response = `In ${data['Country']}, ` + 
                            `Confirmed: ${data['Confirmed']} (+${data['Confirmed'] - data_prev['Confirmed']}), ` +
                            `Deaths: ${data['Deaths']} (+${data['Deaths'] - data_prev['Deaths']}), ` +
                            `Recovered: ${data['Recovered']} (+${data['Recovered'] - data_prev['Recovered']}), ` +
                            `Active: ${data['Active']} (+${data['Active'] - data_prev['Active']}), ` +
                            `Updated Time: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
                                .format(new Date(data['Date']))} (UTC+0.00)`;
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
