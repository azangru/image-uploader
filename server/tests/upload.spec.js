const path = require('path');
const request = require('supertest');


const app = require('../server');

describe('Image uploader', () => {

  test('accepts images', async () => {
    const pathToImage = path.resolve(__dirname, 'fixtures/bookmate.png');

    try {
      const response = await request(app)
      .post('/upload')
      .attach('images[]', pathToImage)
      .expect(200);
      console.log('response', response.body);
    } catch (error) {
      throw `Received error: ${error}`;
    }

  });

});
