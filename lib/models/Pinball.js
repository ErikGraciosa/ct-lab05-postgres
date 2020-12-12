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
        this.manufactureryear = String(row.manufactureryear);
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

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM pinballs WHERE id=$1',
            [id]
        );
        if(!rows[0]) throw new Error(`No pinball with id ${id}`);
        return new Pinball(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM pinballs',
        )
        return rows.map(row => new Pinball(row));
    }

    static async update(id, {title, manufacturer, manufactureryear, multiball}) {
        const { rows } = await pool.query(
            `UPDATE pinballs
                SET title=$1,
                    manufacturer=$2,
                    manufactureryear=$3,
                    multiball=$4
                WHERE id=$5
                RETURNING *`,
            [title, manufacturer, manufactureryear, multiball, id]
        );

        if(!rows[0]) throw new Error(`No pinball machine with id ${id} exists`);
        return new Pinball(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM pinballs WHERE id=$1',
            [id]
        );

        return new Pinball(rows[0]);
    }

}