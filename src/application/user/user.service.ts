import { v4 as uuid4 } from 'uuid'

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DataBaseService } from '../../data-base/data-base.service'
import { CreateUsersDto, UpdateUsersDto } from './user.dto'
import { User } from '../../data-base/dataInteface'

@Injectable()
export class UserService {
  constructor(private db: DataBaseService) {}
  private createNewUser({ login, password }: CreateUsersDto) {
    return {
      id: uuid4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }
  async createUser(createUserDto: CreateUsersDto): Promise<User> {
    const newUser = this.createNewUser(createUserDto)
    const existingUser = this.db.users.find(
      (user) => user.login === newUser.login,
    )

    if (existingUser) {
      throw new HttpException(
        'User with the same name already exists',
        HttpStatus.CONFLICT,
      )
    }

    // TODO: add "await" when implemented in DB
    this.db.users.push(newUser)
    return newUser
  }

  async findAllUsers() {
    return this.db.users
  }

  async findOneUser(id: string) {
    const currentUser = this.db.users.find((user) => user.id === id)
    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return currentUser
  }

  async updateUser(id: string, updateUserDto: UpdateUsersDto) {
    const currentUser = await this.findOneUser(id)

    if (currentUser.password !== updateUserDto.oldPassword) {
      throw new HttpException('Old password does not match', 403)
    }

    currentUser.password = updateUserDto.newPassword
    currentUser.version = currentUser.version + 1
    currentUser.updatedAt = Date.now()

    return currentUser
  }

  async removeUser(id: string) {
    const currentUser = await this.findOneUser(id)
    const index = this.db.users.findIndex((u) => u.id === currentUser.id)
    if (index !== -1) {
      this.db.users.splice(index, 1)
    }
  }
}
