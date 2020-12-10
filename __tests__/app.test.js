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

  it('creates a pinball machine via POST', async() => {
    const response = await request(app)
      .post('/pinballs')
      .send({
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: 1980,
        multiball: true
      });
    
    expect(response.body).toEqual({
        id: '1',
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: '1980',
        multiball: true
    });
  });

  it('gets a pinball machine via id in params', async() => {
    await request(app)
      .post('/pinballs')
      .send({
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: 1980,
        multiball: true
      });
    
    const id = 1;
    const response = await request(app)
      .get(`/pinballs/${id}`);
      
    expect(response.body).toEqual({
        id: '1',
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: '1980',
        multiball: true
    });
  });

  it('updates a pinball machine using /:id req.params.id', async() => {
    await request(app)
      .post('/pinballs')
      .send({
        title: 'Fish Tales',
        manufacturer: 'Williams',
        manufactureryear: 20000,
        multiball: true
      });
    
    const id = 1;
    await request(app)
      .put(`/pinballs/${id}`)
      .send({
        title: 'Grand Prix',
        manufacturer: 'Williams',
        manufactureryear: '1964',
        multiball: false
      });
    
    const response = await request(app)
        .get(`/pinballs/${id}`); 

    expect(response.body).toEqual({
        id: '1',
        title: 'Grand Prix',
        manufacturer: 'Williams',
        manufactureryear: '1964',
        multiball: false
    });
  });


});
