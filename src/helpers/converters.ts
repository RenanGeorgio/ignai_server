import { Types } from "mongoose";

export function cepConverter(cep: string | number) {
  if (typeof cep === "number") return cep;
  return parseInt(cep.replace(/\D/g, ""), 10);
}

export const stringToObjectId: {
  string: (id: string) => Types.ObjectId | void;
  stringArray: (id: string[]) => Types.ObjectId[] | void;
} = {
  string: function (id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return;
    };
    return new Types.ObjectId(id);
  },

  stringArray: function (id: string[]) {
    id?.map((i) => {
      if(!Types.ObjectId.isValid(i)){
        return;
      }
      new Types.ObjectId(i)
    })
  }
};
