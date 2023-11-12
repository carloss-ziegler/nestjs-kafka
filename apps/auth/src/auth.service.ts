import { Injectable } from '@nestjs/common';
import { GetUser } from 'apps/billing/src/get-user.dto';

@Injectable()
export class AuthService {
  private readonly users: any[] = [
    {
      userId: '123',
    },
    {
      userId: '345',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getUser(data: GetUser) {
    console.log(data);
    return this.users.find((user) => user.userId === data.userId);
  }
}
