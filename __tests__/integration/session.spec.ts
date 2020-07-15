import supertest from 'supertest';
import app from '../../src/app';

describe('', () => {
  it('should test', async (done) => {
    const newUser = {
      email: 'g@g.com',
      firstName: 'Gustavo',
      lastName: 'Graeff'
    };

    const response = await supertest(app).post('/users').send(newUser);

    expect(response.status).toBe(200);
    done();
  });
});
