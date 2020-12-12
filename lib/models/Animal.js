const { request } = require('express');
const pool = require('../utils/pool.js');

module.exports = class Animal {
    id;
    genus;
    species;

    constructor(row) {
        this.id = row.id;
        this.genus = row.genus;
        this.species = row.species
    }

    static async insert({ genus, species }) {
        const { rows } = await pool.query(
            'INSERT INTO animals (genus, species) VALUES ($1, $2) RETURNING *',
            [genus, species]
        );
    
        return new Animal(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM animals WHERE id=$1',
            [id]
        )
        if(!rows[0]) throw new Error(`No pinball with id ${id}`);
        return new Animal(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM animals',
        )
        return rows.map(row => new Animal(row));
    }

    static async update(id, { genus, species }) {
        const { rows } = await pool.query(
            `UPDATE animals
                SET genus=$1,
                    species=$2
                WHERE id=$3
                RETURNING *`,
                [genus, species, id]
            );
        if(!rows[0]) throw new Error(`No pinball with id ${id}`);
        return new Animal(rows[0]);    
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM animals WHERE id=$1',
            [id]
        );
        return new Animal(rows[0]);
    }
}