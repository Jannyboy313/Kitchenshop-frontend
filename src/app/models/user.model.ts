import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  role: string = null;
  user_id: number = null;
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