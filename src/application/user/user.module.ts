import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DataBaseService } from '../../data-base/data-base.service'

@Module({
  providers: [UserService, DataBaseService],
  controllers: [UserController],
})
export class UserModule {}
