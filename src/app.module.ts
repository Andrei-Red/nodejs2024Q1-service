import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
// import { DataBaseModule } from './data-base/data-base.module';

@Module({
  imports: [ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
