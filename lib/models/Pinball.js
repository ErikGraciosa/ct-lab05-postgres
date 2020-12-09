const pool = require('../utils/pool.js');

module.exports = class Pinball {
    id;
    title;
    manufacturer;
    manufactureryear;
    multiball;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.manufacturer = row.manufacturer;
        this.manufactureryear = row.manufactureryear;
        this.multiball = row.multiball
    }

    //CRUD endpoints
    static async insert({ title, manufacturer, manufactureryear, multiball }) {
        const { rows } = await pool.query(
            'INSERT INTO pinballs (title, manufacturer, manufactureryear, multiball) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, manufacturer, manufactureryear, multiball]
        );

        return new Pinball(rows[0]);
    }



}