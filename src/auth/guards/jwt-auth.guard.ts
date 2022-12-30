import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info) {
      // if the access token jwt is invalid this is the error we will be returning.
      throw new UnauthorizedException({ message: 'Нет доступа' });
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
