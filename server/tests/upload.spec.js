const path = require('path');
const request = require('supertest');

const app = require('../server');
const hashHelpers = require('../helpers/hash-helpers');

describe('Image uploader', () => {

  const getExpectedFileName = (fileName, hash) => {
    return fileName.split('.').reduce((result, namePart, index, allParts) => {
      if (index + 2 === allParts.length) {
        return `${namePart}-${hash}`;
      } else {
        return namePart;
      }
    }, '');
  };

  test('accepts a single image', async () => {
    const pathToImage = path.resolve(__dirname, 'fixtures/bookmate.png');
    const testImageName = 'test-image.png';

    try {
      const response = await request(app)
      .post('/upload')
      .attach('images[]', pathToImage, testImageName)
      .expect(200);

      const { body: responseBody } = response;

      // expect(Array.isArray(responseBody)).toBe(true);
      // expect(responseBody.length).toBe(1);
      //
      // const fileHash = await hashHelpers.getFileHash(pathToImage);
      // const expectedFileName = getExpectedFileName(testImageName, fileHash);
      // expect(responseBody[0].includes(expectedFileName)).toBe(true);
    } catch (error) {
      throw `Received error: ${error}`;
    }
  });

  test('accepts multiple images', async () => {
    const pathToImage = path.resolve(__dirname, 'fixtures/bookmate.png');
    const testImageName1 = 'test-image-1.png';
    const testImageName2 = 'test-image-2.png';
    const testImageName3 = 'test-image-3.png';

    try {
      const response = await request(app)
      .post('/upload')
      .attach('images[]', pathToImage, testImageName1)
      .attach('images[]', pathToImage, testImageName2)
      .attach('images[]', pathToImage, testImageName3)
      .expect(200);

      const { body: responseBody } = response;

      // expect(Array.isArray(responseBody)).toBe(true);
      // expect(responseBody.length).toBe(3);
      //
      // const fileHash = await hashHelpers.getFileHash(pathToImage);
      // [ testImageName1, testImageName2, testImageName3 ]
      //   .map(fileName => getExpectedFileName(fileName, fileHash))
      //   .forEach(expectedFileName => {
      //     const foundImagePath = responseBody.find(path => path.includes(expectedFileName));
      //     expect(foundImagePath).toBeDefined();
      //   });
    } catch (error) {
      throw `Received error: ${error}`;
    }
  });

});
