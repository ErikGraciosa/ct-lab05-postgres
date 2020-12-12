const pool = require("../utils/pool");

module.exports = class Movie {
    id;
    releaseYear;
    genre;
    director;

    constructor(row) {
        this.id = row.id;
        this.releaseYear = row.releaseYear;
        this.genre = row.genre;
        this.director = row.director;
    }

    static async insert({ releaseYear, genre, director }) {
        const { rows } = await pool.query(
            `INSERT INTO movies (releaseYear, genre, director)
                VALUES ($1, $2, $3)
                RETURNING *`,
            [releaseYear, genre, director]
        );
        return new Movie(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM movies',
        );
        return rows.map(row => new Movie(row));   
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM movies
                WHERE id=$1`,
            [id]
        );
        return new Movie(rows[0]);
    }

    static async update(id, { releaseYear, genre, director }) {
        const { rows } =await pool.query(
            `UPDATE movies
                SET releaseYear=$1,
                    genre=$2,
                    director=$3
                WHERE id=$4
                RETURNING *`,
                [releaseYear, genre, director, id]
        );
        return new Movie(rows[0])
    }

    static async delete(id) {
        const { rows } =await pool.query(
            'DELETE FROM movies WHERE id=$1',
            [id]
            );
        return new Movie(rows[0]);
    }
}