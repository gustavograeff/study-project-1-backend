import supertest from 'supertest';
import app from '../../src/app';

describe('registration', () => {
  it('should return 422 status, email invalid', async (done) => {
    const newUser = {
      firstName: 'Gustavo',
      lastName: 'Graeff',
      password: 'teste'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(422);
    done();
  });

  it('should return 422 status, firstName invalid', async (done) => {
    const newUser = {
      email: 'g@g.com',
      lastName: 'Graeff',
      password: 'teste'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(422);
    done();
  });

  it('should return 422 status, lastName invalid', async (done) => {
    const newUser = {
      email: 'g@g.com',
      firstName: 'Gustavo',
      password: 'teste'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(422);
    done();
  });

  it('should return 422 status, password invalid', async (done) => {
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
