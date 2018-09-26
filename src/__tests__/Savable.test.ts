import { Savable } from "../Savable";
import { LoginData } from "../LoginData";

describe("Savable", () => {
  interface IFruit {
    color: string;
  }

  class FruitModel extends Savable<IFruit> {
    data = {} as any
    keys = [{ key: "color" }]
    tablePath = {
      loginDataInstance: () => LoginData.sharedInstance,
      saveTablePath: () => "/fruits",
      saveTableItemPath: () => "/fruits"
    } as any
  }

  LoginData.sharedInstance.db = {
    ref: () => {
      return {
        push: () => ({ key: "abc" }),
        set: (data) => Promise.resolve(data)
      }
    }
  }

  it("should import the data", async () => {
    const fruit = new FruitModel();
    fruit.loginDataInstance = () => LoginData.sharedInstance;

    const data = await fruit.save().then((data) => data);
    expect(data).toEqual({ uid: "abc" })
  });
});
