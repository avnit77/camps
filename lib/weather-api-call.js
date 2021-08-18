const request = require('superagent');

module.exports = {
    async get(req) {
        // nice idea to pass through the whole `req`
        // const { lat } = req.query;
        // const { lon } = req.query;
        const { lat, lon } = req.query;
        const URL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lon}`;

        const response = await request.get(URL);

        const actualResponse = JSON.parse(response.text);

        //gives us an object with info about the current day's weather
        return actualResponse.daily.data;
    }
};