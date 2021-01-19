import { Deserializable } from "./deserializable.model";

export class Image implements Deserializable {
  image: string = null;
  description: string = null;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}