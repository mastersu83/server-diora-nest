import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ImagesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    }),
    AuthModule,
  ],
})
export class AppModule {}
