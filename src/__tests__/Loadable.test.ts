import { Loadable } from "../Loadable";

describe("Loadable", () => {
  interface IFruit {
    color: string;
  }

  class FruitModel extends Loadable<IFruit> {
    keys = [{ key: "color" }]
  }

  it("should import the data", () => {
    const fruit = new FruitModel();
    fruit.importData({ color: "red" });
    expect(fruit.data).toEqual({
      color: "red",
    });
  });
});
