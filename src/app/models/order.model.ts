import { Deserializable } from "./deserializable.model";

export class Order implements Deserializable {
  orders_id: number = null;
  timestamp: string = null;
  user_id: number;
  productnumber: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}