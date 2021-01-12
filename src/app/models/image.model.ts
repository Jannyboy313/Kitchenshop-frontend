import { Deserializable } from "./deserializable.model";

export class Model implements Deserializable {
  image: string = null;
  description: string = null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}