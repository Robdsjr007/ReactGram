const { login } = require('../../src/controllers/UserController');
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Controller - Login', () => {
  it('deve fazer login do usuário', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({
      _id: 'userId',
      email: 'test@example.com',
      password: 'hashedPassword',
      profileImage: 'profile.jpg'
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'userId',
      profileImage: 'profile.jpg',
      token: 'token'
    });
  });

  it('deve retornar erro se o usuário não for encontrado', async () => {
    const req = {
      body: {
        email: 'test@example.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Usuário não encontrado.'] });
  });

  it('deve retornar erro se a senha estiver incorreta', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({
      _id: 'userId',
      email: 'test@example.com',
      password: 'hashedPassword'
    });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Senha inválida.'] });
  });
});
