import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }