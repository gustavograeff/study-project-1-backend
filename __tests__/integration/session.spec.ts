import supertest from 'supertest';
import app from '../../src/app';

describe('user session', () => {
  it('should return error when email is not registered', async (done) => {
    const userCredentials = {
      email: 'aaaa@aaaa.com',
      password: 'teste'
    };

    const response = await supertest(app).post('/login').send(userCredentials);
    const responseData = response.body;

    expect(responseData.message).toEqual('An user with this email could not be found!');
    done();
  });

  it('should return login error when not passing password', async (done) => {
    const userCredentials = {
      email: 'g@g.com'
    };

    const response = await supertest(app).post('/login').send(userCredentials);
    const responseData = response.body;

    expect(responseData.requestError).toEqual('Missing password on request body!');
    done();
  });

  it('should return invalid password', async (done) => {
    const userCredentials = {
      email: 'g@g.com',
      password: 'testee'
    };

    const response = await supertest(app).post('/login').send(userCredentials);
    const responseData = response.body;

    expect(responseData.message).toEqual('Invalid password!');
    done();
  });

  it('should return 200 status if credentials are correct', async (done) => {
    const userCredentials = {
      email: 'g@g.com',
      password: 'teste'
    };

    const response = await supertest(app).post('/login').send(userCredentials);

    expect(response.status).toBe(200);
    done();
  });
});
