import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export interface IUser extends Document {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly avatarUrl: string;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
