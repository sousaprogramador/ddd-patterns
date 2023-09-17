import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      },
    );

    entity.items.forEach(async (item) => {
      await OrderItemModel.update(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        },
        {
          where: { id: item.id },
        },
      );
    });
  }

  async find(id: string): Promise<Order> {
    const foundOrder = await OrderModel.findOne({
      where: { id: id },
      include: ['items'],
    });

    const order = new Order(
      foundOrder.id,
      foundOrder.customer_id,
      foundOrder.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        );
      }),
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const foundOrders = await OrderModel.findAll({
      include: ['items'],
    });
    return foundOrders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          );
        }),
      );
    });
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }
}
