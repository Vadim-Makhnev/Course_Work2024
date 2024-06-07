var assert = require('assert');
const { request } = require('http');


describe('GET /api/users', () => {
  it('responds with json', async () => {
    const response = await fetch('http://localhost:5001/api/users');
    assert.equal(response.status, 200);
  });
});
  

describe('GET /api/products', () => {
  it('responds with json', async () => {
    const response = await fetch('http://localhost:5001/api/products');
    assert.equal(response.status, 200);
  });
})


describe('POST /api/register', () => {
  it('responds with json', async () => {
    const response = await fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'qS9Q120@example.com', password: '12322241156' }),
    });
    assert.equal(response.status, 201);
  });
})


describe('POST /api/login', () => {
  it('responds with json', async () => {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'qS9Q0@example.com', password: '123456' }),
    });
    assert.equal(response.status, 200);
  });
})