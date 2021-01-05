import { Deserializable } from "./deserializable.model";

export class Product implements Deserializable {
  productnumber: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
  
}