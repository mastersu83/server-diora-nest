import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  // @IsNotEmpty()
  @Length(4, 32, { message: 'Имя минимум 4 символа' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(4, 32, { message: 'Пароль минимум 4 символа' })
  password: string;

  @IsUrl(undefined, { message: 'Укажите валидную ссылку для аватара' })
  @IsOptional()
  avatarUrl: string;
}
