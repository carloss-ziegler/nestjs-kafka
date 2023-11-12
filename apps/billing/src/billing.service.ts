import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from 'apps/nestjs-kafka/src/order-created.event';
import { GetUser } from './get-user.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    console.log(orderCreatedEvent);
    this.authClient
      .send('get_user', new GetUser(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(user);
        console.log(
          `Charging user with id ${user.userId} a price of ${orderCreatedEvent.price}`,
        );
      });
  }
}
