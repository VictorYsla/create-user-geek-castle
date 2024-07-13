import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { generatePassword } from './functions';

@Injectable()
export class UsersService {
  constructor() {
    firebase.initializeApp({
      projectId: process.env.PROJECTID,
    });
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    let securePassword = password ?? generatePassword();

    if (!password) {
      securePassword = await bcrypt.hash(securePassword, 10);
    }
    try {
      const {
        uid,
        email: emailUser,
        tokensValidAfterTime,
      } = await firebase.auth().createUser({ email, password: securePassword });

      await firebase
        .firestore()
        .collection('Users')
        .doc(uid)
        .set({ uid, emailUser, tokensValidAfterTime, username });

      return { uid, emailUser, tokensValidAfterTime, username };
    } catch (error) {
      return error;
    }
  }
}
