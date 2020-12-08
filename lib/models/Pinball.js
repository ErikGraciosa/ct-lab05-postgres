const pool = require('..utils/pool.js');

module.exports = class Pinball {
    id;
    title;
    manufacturer;
    manufacturerYear;
    multiball;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.manufacturer = row.manufacturer;
        this.manufacturerYear = row.manufacturerYear;
        this.multiball = row.multiball
    }

    //CRUD endpoints
    static async insert({ title, manufacturer, manufacturerYear, multiball }) {
        const { rows } = await pool.query(
            'INSERT INTO songs (title, manufacturer, manufacturerYear, multiball VALUES ($1, $2, $3, $4) RETURNING *',
            [title, manufacturer, manufacturerYear, multiball]
        );

        return new Pinball(rows[0]);
    }



}