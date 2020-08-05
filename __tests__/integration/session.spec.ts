import supertest from 'supertest';
import app from '../../src/app';
import User from '../../src/schemas/User';

describe('registration', () => {
  it('Should reset mongo user document', async (done) => {
    const x = await User.deleteMany({});
    done();
  });

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

  it('should return 200 status, user created', async (done) => {
    const newUser = {
      email: 'g@g.com',
      firstName: 'Gustavo',
      lastName: 'Graeff',
      password: 'teste'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(200);
    done();
  });

  it('should trim body and encrypt user password on register', async (done) => {
    const newUser = {
      email: 'g@g.co',
      firstName: 'Gustavo',
      lastName: 'Graeff',
      password: 'teste!'
    };

    const response = await supertest(app).post('/register').send(newUser);
    const responseData = JSON.parse(response.text);

    expect(responseData.email).toEqual(newUser.email.trim());
    expect(responseData.firstName).toEqual(newUser.firstName.trim());
    expect(responseData.lastName).toEqual(newUser.lastName.trim());
    expect(responseData.password).not.toEqual(newUser.password);
    done();
  });

  it('should apply .trim() to fix every body data spaces', async (done) => {
    const newUser = {
      email: ' g@g.co ',
      firstName: ' Gustavo ',
      lastName: ' Graeff ',
      password: ' teste! '
    };

    const response = await supertest(app).post('/register').send(newUser);
    const responseData = JSON.parse(response.text);

    expect(responseData.email).not.toEqual(newUser.email.trim());
    expect(responseData.firstName).not.toEqual(newUser.firstName.trim());
    expect(responseData.lastName).not.toEqual(newUser.lastName.trim());
    done();
  });

  it('should return 422 status, email already registered', async (done) => {
    const newUser = {
      email: 'g@g.com',
      firstName: 'Gustavo',
      lastName: 'Graeff',
      password: 'teste'
    };

    const response = await supertest(app).post('/register').send(newUser);

    expect(response.status).toBe(422);
    done();
  });
});
