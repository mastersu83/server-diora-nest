import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ImagesModule,
    MongooseModule.forRoot(
      'mongodb+srv://master:Derbent_5000@cluster0.0zoww.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'dioraKids',
      },
    ),
    // MongooseModule.forRoot('mongodb://localhost/authentication'),
    AuthModule,
  ],
})
export class AppModule {}
