const pool = require("../utils/pool");

module.exports = class Wire {
    id;
    wireSize;
    insulationColor;
    length;

    constructor(row) {
        this.id = row.id;
        this.wireSize = row.wireSize;
        this.insulationColor = row.insulationColor;
        this.length = row.length;
    }

    static async insert({ wireSize, insulationColor, length }) {
        const { rows } = await pool.query(
            `INSERT INTO wires (wiresize, insulationcolor, length)
                VALUES ($1, $2, $3)
                RETURNING *`,
            [wireSize, insulationColor, length]
        );
        return new Wire(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM wires',
        );
        return rows.map(row => new Wire(row));   
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM wires
                WHERE id=$1`,
            [id]
        );
        return new Wire(rows[0]);
    }

    static async update(id, { wireSize, insulationColor, length }) {
        const { rows } =await pool.query(
            `UPDATE wires
                SET wiresize=$1,
                    insulationcolor=$2,
                    length=$3
                WHERE id=$4
                RETURNING *`,
                [wireSize, insulationColor, length, id]
        );
        return new Wire(rows[0])
    }

    static async delete(id) {
        const { rows } =await pool.query(
            'DELETE FROM wires WHERE id=$1',
            [id]
            );
        return new Wire(rows[0]);
    }
}