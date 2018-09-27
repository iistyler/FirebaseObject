export class MockRef {
  _mockKey = "abc"
  remove = jest.fn()
  
  push() {
    return ({ key: this._mockKey });
  }

  set(data) {
    return Promise.resolve(data);
  }
}

export class MockDb {
  _ref = new MockRef()
  
  ref() {
    return this._ref;
  }
}
