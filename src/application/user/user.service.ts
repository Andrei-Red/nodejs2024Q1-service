import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from '../../data-base/data-base.service';

@Injectable()
export class UserService {
  usersDB: any[];
  constructor(private dataBase: DataBaseService) {
    this.usersDB = dataBase.db.user;
  }
  getUsers() {
    return this.usersDB.map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  getUserById(id) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersDB.find((user) => user.id === id);
    if (user) {
      return {
        ...user,
        password: undefined,
      };
    }
    return null;
  }

  addNewUser(user) {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 0,
      createdAt: new Date(),
    };
    // console.log('newUser', newUser);
    this.usersDB.push(newUser);
    // console.log('this.usersDB', this.usersDB);
    console.log('toRES-addNewUser', this.getUserById(newUser.id));
    return this.getUserById(newUser.id);
  }

  updateUser(user, id) {
    const currentUser = this.usersDB.find((user) => user.id === id);
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!currentUser) {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.oldPassword === user.newPassword) {
      throw new HttpException(
        `new user password must differ from old`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (currentUser.password !== user.oldPassword) {
      throw new HttpException(
        `old user password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const userFields = Object.keys(user);
    // userFields.forEach((field) => {
    //   currentUser[field] = user[field];
    // });
    currentUser.password = user.newPassword;
    currentUser.updatedAt = new Date();
    currentUser.version = currentUser.version + 1;

    return this.getUserById(currentUser.id);
  }

  deleteUser(userID: string) {
    console.log('ddd');
    const initialLength = this.usersDB.length;
    this.usersDB = this.usersDB.filter((user) => user.id !== userID);
    return this.usersDB.length !== initialLength;
  }
}
