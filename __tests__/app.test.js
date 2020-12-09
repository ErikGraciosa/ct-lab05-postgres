const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
// const Pinball = require('../lib/models/Toy');
const pool = require('../lib/utils/pool');

describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a toy via POST', async() => {
    const response = await request(app)
      .post('/pinballs')
      .send({
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: 1980,
        multiball: true
      });
    console.log(response.body);
    expect(response.body).toEqual({
        id: '1',
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: '1980',
        multiball: true
    });
  });

  

  
});
