import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerAddressUpdatedEvent from '../customer-address-updated.event';

export default class SendEmailWhenAddressIsUpdatedHandler
  implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log('new address', event);
  }
}
