const request = require('superagent');

function formatLocationResponse(locationItem) {
    const {
        geometry: {
            location: {
                lat, 
                lng,
            },
        },
        formatted_address,
    } = locationItem; 

    return {
        // formatted_query is physical address
        formatted_query: formatted_address,
        lat: lat, 
        lon: lng
    };
}

module.exports = {
    async get(searchQuery) {
        const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
        const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${GEOCODE_API_KEY}`;
        const response = await request.get(URL);
        const actualItem = JSON.parse(response.text).results[0];
        const searchLocationData = formatLocationResponse(actualItem); 

        return searchLocationData;
    }
};