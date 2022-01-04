const pg = require('pg')

if(process.env.DATABASE_URL) {
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
module.exports = pool
} else {
    const pool = new pg.Pool ({
        name: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        host: 'localhost',
        port: 5432,
        password: process.env.DATABASE_PASSWORD
    });

    module.exports = {
        query: (text,params) => pool.query(text,params)
    };
}