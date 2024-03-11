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
    console.log('getUsers');
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() id: string) {
    if (typeof id !== 'string') {
      // @ts-ignore
      id = id?.id
    }

    return this.userService.getUserById(id);
  }

  @Post()
  addNewUser(@Body() user) {
    console.log('user', user);
    return this.userService.addNewUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user) {
    console.log('updateUser', id);
    return this.userService.updateUser(user, id);
  }

  @Delete(':id')
  deleteUser(@Param() id: string) {
    return this.userService.deleteUser(id);
  }
}
