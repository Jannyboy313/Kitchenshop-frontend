import { Deserializable } from "./deserializable.model";

export class Order implements Deserializable {
  orders_id: number = null;
  timestamp: string = null;
  user_id: number;
  productnumber: number;
  name: string = null;
  description: string = null;
  stock: string = null;
  price: string = null;
  category: string = null;
  amount: number = null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}