import { Deletable } from "../Deletable";
import { LoginData } from "../LoginData";
import { MockDb } from "./__fixtures__";

describe("Deletable", () => {
  interface IFruit {
    color: string;
  }

  class FruitModel extends Deletable<IFruit> {
    data = {} as any
    keys = [{ key: "color" }]
    tablePath = {
      loginDataInstance: () => LoginData.sharedInstance,
      saveTablePath: () => "/fruits",
      saveTableItemPath: () => "/fruits",
      deleteTableItemPath: () => "fruits"
    } as any
    loginDataInstance = () => LoginData.sharedInstance

    willDelete = jest.fn()
    didDelete = jest.fn()
  }

  
  describe("delete", () => {
    let mockDb;
    beforeEach(() => {
      mockDb = new MockDb();
      LoginData.sharedInstance.db = mockDb;
    });

    it("should remove the object", () => {
      const fruit = new FruitModel();
      fruit.delete();
      expect(mockDb._ref.remove).toBeCalled();
      expect(fruit.willDelete).toBeCalled();
      expect(fruit.didDelete).toBeCalled();
    });

    it("should not remove the object if shouldDelete returns false", () => {
      class AppleModel extends FruitModel {
        shouldDelete() {
          return false;
        }
      }

      const apple = new AppleModel();
      apple.delete();
      expect(mockDb._ref.remove).not.toBeCalled();
    })
  });
  
  describe("shouldDelete", () => {
    it("should return true", () => {
      const fruit = new FruitModel();
      expect(fruit.shouldDelete()).toEqual(true);
    })
  })
});
