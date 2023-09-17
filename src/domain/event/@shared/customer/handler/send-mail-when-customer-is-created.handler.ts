import EventHandlerInterface from '../../event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('send mail.... CustomerCreated', event);
  }
}
