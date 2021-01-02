import { Deserializable } from "./deserializable.model";

export class Address implements Deserializable {
  address_id: string = null;
  city: string;
  street_address: string;
  zipcode: string

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}