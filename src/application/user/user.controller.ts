import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  addNewUser(@Body() user) {
    console.log('user', user);
    return this.userService.addNewUser(user);
  }

  @Put()
  updateUser(@Body() user) {
    return this.userService.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() id: string) {
    return this.userService.deleteUser(id);
  }
}
