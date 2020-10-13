const axios = require('axios');

const handler = (interaction) => {
    return new Promise((resolve, reject) => {
        let location = interaction.parameters['location'];
        let url;
        if (location === 'global') {
            url = "https://api.covid19api.com/world/total";
            axios
            .get(url)
            .then((res) => {
                let data = res.data;
                if (data.message && data.message === 'Not found') {
                    interaction.response.followupEvent = {
                        name: 'data-not-found',
                        data: {}
                    }
                }
                else {
                    interaction.response.followupEvent = {
                        name: 'status-data-found',
                        data: {
                            TotalConfirmed: data.TotalConfirmed,
                            TotalDeaths: data.TotalDeaths,
                            TotalRecovered: data.TotalRecovered,
                            UpdatedTime: new Intl.DateTimeFormat(
                                'en-US', 
                                {year: 'numeric', month: 'long', day: 'numeric'}
                                ).format(new Date())
                        }
                    }
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
                    interaction.response.followupEvent = {
                        name: 'data-not-found',
                        data: {}
                    }
                }
                else {
                    data = raw[raw.length - 1];
                    interaction.response.followupEvent = {
                        name: 'global-status-data-found',
                        data: {
                            TotalConfirmed: data.TotalConfirmed,
                            TotalDeaths: data.TotalDeaths,
                            TotalRecovered: data.TotalRecovered,
                            UpdatedTime: new Intl.DateTimeFormat(
                                'en-US', 
                                {year: 'numeric', month: 'long', day: 'numeric'}
                                ).format(new Date(data.Date))
                        }
                    }
                }
                resolve();
            })
            .catch(e => reject(e));
        }
    });
};

module.exports = handler;

// let categorizedModules = system.loadModulesFromFolder(path.join(__dirname, 'handlers'))
//   Object.keys(categorizedModules).forEach(moduleName => {
//     handlers[`${folderName}/${moduleName}`] = categorizedModules[moduleName]
// })