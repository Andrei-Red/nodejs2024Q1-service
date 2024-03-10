import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
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

  updateUser(user) {
    const currentUser = this.getUserById(user.id);
    const userFields = Object.keys(user);
    userFields.forEach((field) => {
      currentUser[field] = user[field];
    });
    currentUser.updatedAt = new Date();
    currentUser.version = currentUser.version + 1;

    return this.getUserById(currentUser.id);
  }

  deleteUser(userID: string) {
    const initialLength = this.usersDB.length;
    this.usersDB = this.usersDB.filter((user) => user.id !== userID);
    return this.usersDB.length !== initialLength;
  }
}
