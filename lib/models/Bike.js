const pool = require("../utils/pool");

module.exports = class Bike {
    id;
    style;
    framesize;
    wheelsize;

    constructor(row) {
        this.id = row.id;
        this.style = row.style;
        this.framesize = row.framesize;
        this.wheelsize = row.wheelsize;
    }

    static async insert({ style, framesize, wheelsize }) {
        const { rows } = await pool.query(
            `INSERT INTO bikes (style, framesize, wheelsize)
                VALUES ($1, $2, $3)
                RETURNING *`,
            [style, framesize, wheelsize]
        );
        return new Animal(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM bikes',
        );
        return rows.map(row => new Animal(row));   
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM bikes
                WHERE id=$1`,
            [id]
        );
        return new Animal(rows[0]);
    }

    static async update(id, { style, wheelsize, framesize}) {
        const { rows } =await pool.query(
            `UPDATE bikes
                SET style=$1,
                    framesize=$2,
                    wheelsize=$3
                WHERE id=$4
                RETURNING *`,
                [style, framesize, wheelsize, id]
        );
        return new Animal(rows[0])
    }

    static async delete(id) {
        const { rows } =await pool.query(
            'DELETE FROM bikes WHERE id=$1',
            [id]
            );
        return new Bike(rows[0]);
    }
}