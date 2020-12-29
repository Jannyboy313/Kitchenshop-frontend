import {Deserializable} from "./deserializable.model";

export class category implements Deserializable {
  id: number;
  name: string;
  car: Car;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}