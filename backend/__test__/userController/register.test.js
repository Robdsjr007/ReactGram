const { register } = require('../../src/controllers/UserController');
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Controller - Register', () => {
  it('deve registrar um novo usuário', async () => {
    const req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ _id: 'userId' });
    jwt.sign.mockReturnValue('token');

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
    expect(User.create).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: 'userId', token: 'token' });
  });

  it('deve retornar erro se o usuário já existir', async () => {
    const req = {
      body: {
        email: 'test@example.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Por favor, utilize outro e-mail'] });
  });
});
