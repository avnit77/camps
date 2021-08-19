# TREKS N TRAILS
## Version 1.0.0 
MVP reached, basic functionality with current location.
## Version 1.1.0
Launch version including search location, weather data, campsite data, and directions.

# Team Members:
Brittany Houtz, Dan Meloy, JBJ Kansagot, Lisa Carpenter, Tali Avni, Tess Lameyer

## Project Description
MVP: A responsive app that enables a user to find hikes either based on current location or a searched location. App will return information about hikes including length, difficulty, and rating as well as distance and drive time from current location, current weather, and camping options. The user has the ability to filter hikes by rating, difficulty and max length. Additionally, the user has the ability to save favorite hikes for later.

## Problem Domain
Frequently outdoor enthusiasts want to find new hikes close to home or in a place that they are visiting. A few apps exist to help them find this information, but none also include weather information for a given period of time and information about the closest campsites.

## Libraries and Frameworks
This app makes use of the following dependencies -
    1. Express
    2. CORS
    3. PG
    4. JSON Web Token
    4. BCRYPT.js
    5. Morgan
    6. Superagent
    7. dotenv

## Endpoints
    * '/api/auth', authRoutes
    * '/api', ensureAuth
        * /verfiy returns { verified: true }
        * /signin
        * /signup
    * '/api/location', async(req, res)
        * Sample response for get /api/location  [
        {
            id: 7000095,
            name: 'Jenny Lake',
            type: 'Featured Hike',
            summary: 'One of the most popular trails in Grand Teton and maybe the world...',
            difficulty: 'greenBlue',
            stars: 4.5,
            starVotes: 71,
            location: 'Jackson, Wyoming',
            url: 'https://www.hikingproject.com/trail/7000095/jenny-lake',
            imgSqSmall: 'https://cdn-files.apstatic.com/hike/7000362_sqsmall_1554159321.jpg',
            imgSmall: 'https://cdn-files.apstatic.com/hike/7000362_small_1554159321.jpg',
            imgSmallMed: 'https://cdn-files.apstatic.com/hike/7000362_smallMed_1554159321.jpg',
            imgMedium: 'https://cdn-files.apstatic.com/hike/7000362_medium_1554159321.jpg',
            length: 7.3,
            ascent: 385,
            descent: -384,
            high: 6897,
            low: 6788,
            longitude: -110.7253,
            latitude: 43.7518,
            conditionStatus: 'Unknown',
            conditionDetails: null,
            conditionDate: '1970-01-01 00:00:00'
        }, {}, ...]
    * '/api/hikes', async(req, res)
        *Sample response for get /api/hikes  [
        {
            id: 7029677,
            name: 'Multnomah Falls Loop',
            type: 'Featured Hike',
            summary: 'A hike to see five waterfalls starting at the largest and ending with the second largest.',
            difficulty: 'blue',
            stars: 4.8,
            starVotes: 24,
            location: 'Bridal Veil, Oregon',
            url: 'https://www.hikingproject.com/trail/7029677/multnomah-falls-loop',
            imgSqSmall: 'https://cdn-files.apstatic.com/hike/7010571_sqsmall_1554398780.jpg',
            imgSmall: 'https://cdn-files.apstatic.com/hike/7010571_small_1554398780.jpg',
            imgSmallMed: 'https://cdn-files.apstatic.com/hike/7010571_smallMed_1554398780.jpg',
            imgMedium: 'https://cdn-files.apstatic.com/hike/7010571_medium_1554398780.jpg',
            length: 4.8,
            ascent: 1554,
            descent: -1510,
            high: 1517,
            low: 65,
            longitude: -122.117,
            latitude: 45.5776,
            conditionStatus: 'Unknown',
            conditionDetails: null,
            conditionDate: '1970-01-01 00:00:00',
            isFavorite: false
        }, {}, ... ]
    * '/api/campgrounds', async(req, res)
        * Sample response for get /api/campground  [
  {
    id: 115201453,
    name: 'Larch Mountain',
    isBookable: false,
    isCampground: false,
    location: 'Bridal Veil, Oregon',
    latitude: 45.5289,
    longitude: -122.0876,
    url: 'https://www.rei.com/campgrounds/camp/115201453/larch-mountain',
    imgUrl: 'https://www.rei.com/assets/camp/images/campground-placeholder-image/live.png',
    numCampsites: 0
  }, {}, ...]
    * '/api/weather', async(req, res)
        * Sample result for get /api/weather  [
  {
    time: 1574582400,
    summary: 'Light rain until morning, starting again in the evening.',
    icon: 'rain',
    sunriseTime: 1574608860,
    sunsetTime: 1574641920,
    moonPhase: 0.95,
    precipIntensity: 0.0129,
    precipIntensityMax: 0.0629,
    precipIntensityMaxTime: 1574668800,
    precipProbability: 0.94,
    precipType: 'rain',
    temperatureHigh: 49.09,
    temperatureHighTime: 1574635680,
    temperatureLow: 40.48,
    temperatureLowTime: 1574697600,
    apparentTemperatureHigh: 46.79,
    apparentTemperatureHighTime: 1574629740,
    apparentTemperatureLow: 36.13,
    apparentTemperatureLowTime: 1574697600,
    dewPoint: 38.63,
    humidity: 0.78,
    pressure: 1025.5,
    windSpeed: 4.22,
    windGust: 15.92,
    windGustTime: 1574668800,
    windBearing: 243,
    cloudCover: 0.81,
    uvIndex: 1,
    uvIndexTime: 1574625600,
    visibility: 5.776,
    ozone: 301.2,
    temperatureMin: 42.09,
    temperatureMinTime: 1574668800,
    temperatureMax: 49.09,
    temperatureMaxTime: 1574635680,
    apparentTemperatureMin: 38.93,
    apparentTemperatureMinTime: 1574668800,
    apparentTemperatureMax: 46.79,
    apparentTemperatureMaxTime: 1574629740
  }, {}, ...]
    * '/api/favorites', async(req, res)
    * '/api/favorites/:hike_id', (req, res)
        * * /api/favorites returns { removed: true }

## Database Schemas

    1. users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
    1. favorites (
                id SERIAL PRIMARY KEY,
                hike_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL REFERENCES users(id)
            );

    1. saved_hikes (
                id INTEGER PRIMARY KEY,
                hike_obj VARCHAR(4000) NOT NULL,
                campgrounds_arr VARCHAR(4000)
            );

    1. campgrounds (
                id SERIAL PRIMARY KEY,
                campground_obj VARCHAR(4000) NOT NULL
            );


# Initial Project Scope:

MVP: A responsive app that enables a user to search a database of hikes by parameters such as difficulty, length, and distance from current location, see nearby campsites, and create a collection(s) of hikes that are saved for future reference. 
1. Login Page 
2. Hikes List Page
3. User Favorites Page 
4. Details Page 
5. About Us Page
    

# Copyright 2019 Plant Parenthood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
