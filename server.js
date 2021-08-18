// Load Environment Variables from the .env file

require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');
// Services
const hikesApi = require('./lib/rei-hike-api-call.js');
const campgroundsApi = require('./lib/rei-campground-api-call.js');
const geocodeApi = require('./lib/google-geocode-api-call.js');
const weatherApi = require('./lib/weather-api-call.js');

// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');

const sendError = (res, err) => {
    console.log(err);
    res.status(500).json({
        error: err.message || err
    });
};

const authRoutes = createAuthRoutes({
    async selectUser(email) {
        const result = await client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1;
        `, [email]);
        return result.rows[0];
    },
    async insertUser(user, hash) {
        const result = await client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `, [user.email, hash, user.displayName]);
        return result.rows[0];
    }
});

// application Setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token
app.use('/api', ensureAuth);

// *** API Routes ***

app.get('/api/location', async (req, res) => {
    try {
        const location = await geocodeApi.get(req.query.search);
        const hikes = await hikesApi.get({
            query: location
        });
        res.json(hikes);
    }
    catch (err) {
        sendError(res, err);
    }
});

app.get('/api/hikes', async (req, res) => {

    try {
        //const query = req.query;

        const hikes = await hikesApi.get(req);
        const ids = hikes.map(hike => hike.id);
        const result = await client.query(`
            SELECT hike_id
            FROM favorites
            WHERE user_id = $1
            AND hike_id = ANY($2)
            `, [req.userId, ids]);

        const lookup = result.rows.reduce((acc, object) => {
            acc[object.hike_id] = true;
            return acc;
        }, {});
        // isFavorite property is added to each hike and set as true if isFavorite and false otherwise.
        hikes.forEach(hike => hike.isFavorite = lookup[hike.id] || false);
        res.json(hikes);
    }

    catch (err) {
        sendError(res, err);
    }
});

app.get('/api/campgrounds', async (req, res) => {

    try {
        const campgrounds = await campgroundsApi.get(req);
        res.json(campgrounds);
    }

    catch (err) {
        sendError(res, err);
    }
});

app.get('/api/weather', async (req, res) => {
    try {
        const weather = await weatherApi.get(req);
        res.json(weather);
    }
    catch (err) {
        sendError(res, err);
    }
});

//endpoint for saving hikes (will only happen when user favorites a hike)
app.post('/api/hikes', async (req, res) => {
    try {
        // seems strange to me that both `hike` and `campground` are equal to req.body
        const hike = req.body;

        const campgrounds = req.body;


        const existingSavedHike = await client.query(`
            SELECT * FROM saved_hikes
            WHERE $1 = id;
        `, [hike.id]);

        // the outcome of the saveOrFetch is a backend fetch from our database of a hike that was not already there
        if (!existingSavedHike.rows.length) {
            const result = await client.query(`
                INSERT INTO saved_hikes (hike_obj, campgrounds_arr, id)
                VALUES ($1, $2, $3)
                RETURNING hike_obj as "hikeObj", campgrounds_arr as "campgroundsArr", id;
            `, [hike, campgrounds || 'wow', hike.id]);

            res.json(result.rows[0]);
        } else {
            // the outcome of the saveOrFetch is a backend fetch from our database of an already existing hike
            res.json(existingSavedHike.rows[0]);
        }

    }

    catch (err) {
        sendError(res, err);
    }
});

//we might have to add this back in - TRUE as "isFavorite"
app.get('/api/favorites', async (req, res) => {
    try {
        const favorites = await client.query(`
            SELECT *
            FROM favorites
            WHERE user_id=$1
        `, [req.userId]);

        const favoriteHikeIds = favorites.rows.map(favorite => favorite.hike_id);
        const result = await client.query(`
            SELECT hike_obj
            FROM saved_hikes
            WHERE id = ANY($1)
        `, [favoriteHikeIds]);

        const parsedRows = result.rows.map(row => JSON.parse(row.hike_obj));
        res.json(parsedRows);
    }

    catch (err) {
        sendError(res, err);
    }
});

//add a hike to your faves
app.post('/api/favorites', async (req, res) => {
    try {
        const hike = req.body;
        const result = await client.query(`
            INSERT INTO favorites (user_id, hike_id)
            VALUES ($1, $2)
            RETURNING user_id as "userId", hike_id as "hikeId";
        `, [req.userId, hike.id]);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    }

    catch (err) {
        sendError(res, err);
    }
});

app.delete('/api/favorites/:hike_id', (req, res) => {

    try {
        client.query(`
            DELETE FROM favorites
            WHERE hike_id = $1
            AND user_id = $2;
        `, [req.params.hike_id, req.userId]);

        res.json({ removed: true });
    }

    catch (err) {
        sendError(res, err);
    }
});

//Start up server
app.listen(PORT, () => {
    console.log('serving running on PORT', PORT);
});