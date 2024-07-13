import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { generatePassword } from './functions';
import { charset } from './constans';

const firebaseAuthMock = {
  createUser: jest.fn().mockResolvedValue({
    uid: 'mockedUid',
    email: 'mocked@example.com',
    tokensValidAfterTime: new Date().toISOString(),
  }),
};

const firestoreMock = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      set: jest.fn().mockResolvedValue(undefined),
    })),
  })),
};

jest.mock('firebase-admin', () => ({
  auth: () => firebaseAuthMock,
  firestore: () => firestoreMock,
  initializeApp: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .overrideProvider(firebase)
      .useValue([firebaseAuthMock, firestoreMock])
      .compile();

    service = module.get<UsersService>(UsersService);

    firebase.initializeApp();
  });

  it('should create a new user without password', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: null,
    };

    const password = generatePassword();
    expect(password.length).toBe(8);

    for (const char of password) {
      expect(charset.includes(char)).toBe(true);
    }

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('mockedHashedPassword'));

    const result = await service.signup(createUserDto);

    expect(result).toEqual({
      uid: 'mockedUid',
      emailUser: 'mocked@example.com',
      tokensValidAfterTime: expect.any(String),
      username: 'testuser',
    });
  });

  it('should create a new user with password', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'vacaciones',
    };

    const result = await service.signup(createUserDto);

    expect(result).toEqual({
      uid: 'mockedUid',
      emailUser: 'mocked@example.com',
      tokensValidAfterTime: expect.any(String),
      username: 'testuser',
    });
  });
});
