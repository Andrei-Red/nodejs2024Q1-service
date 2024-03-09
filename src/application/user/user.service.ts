import { Injectable } from '@nestjs/common';
// import { DataBaseService } from '../../data-base/data-base.service';

@Injectable()
export class UserService {
  // constructor(private dataBase: DataBaseService) {}
  getUsers() {
    return {user: ''} //this.dataBase;
  }
}
