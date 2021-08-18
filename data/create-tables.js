const client = require('../lib/client');

run();

async function run() {

    try {
        // run a query to create tables
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
            CREATE TABLE favorites (
                id SERIAL PRIMARY KEY,
                hike_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL REFERENCES users(id)
            );

            CREATE TABLE saved_hikes (
                id INTEGER PRIMARY KEY,
                hike_obj VARCHAR(4000) NOT NULL,
                campgrounds_arr VARCHAR(4000)
            );

            CREATE TABLE campgrounds (
                id SERIAL PRIMARY KEY,
                campground_obj VARCHAR(4000) NOT NULL
            );

        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
}