import supertest from 'supertest';
import app from '../../src/app';

describe('registration', () => {
  it('should return 422 status code when em-mail already exists', async (done) => {
    const newUser = {
      email: 'g@g.com',
      firstName: 'Gustavo',
      lastName: 'Graeff'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(422);
    done();
  });
});
