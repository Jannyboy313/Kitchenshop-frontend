import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}