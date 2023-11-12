import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderRequest } from './create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createOrder(createOrder: CreateOrderRequest) {
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent('123', createOrder.userId, createOrder.price),
    );

    return {
      success: true,
      message: 'Order created successfully.',
    };
  }
}
