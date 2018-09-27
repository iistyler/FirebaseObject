import { Savable } from "../Savable";
import { LoginData } from "../LoginData";
import { MockDb } from "./__fixtures__";

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
    loginDataInstance = () => LoginData.sharedInstance
  }

  const mockDb = new MockDb();
  LoginData.sharedInstance.db = mockDb;

  describe("save", () => {
    it("should save the data", async () => {
      const fruit = new FruitModel();  
      fruit.data = { color: "red" };
      const data = await fruit.save().then((data) => data);
      expect(data).toEqual({ uid: "abc", color: "red" })
    });

    it("should save the data including provided uid", async () => {
      const fruit = new FruitModel();  
      fruit.data = { uid: "def" };
      const data = await fruit.save().then((data) => data);
      expect(data).toEqual({ uid: "def" })
    });
  });

  describe("shouldSave", () => {
    it("should return true", () => {
      const fruit = new FruitModel(); 
      expect(fruit.shouldSave()).toEqual(true);
    })
  })
});
