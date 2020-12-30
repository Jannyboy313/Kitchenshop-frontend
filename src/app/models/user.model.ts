import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  role: string;
  user_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
  address_id: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}