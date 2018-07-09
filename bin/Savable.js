"use strict";
//  Created by Tyler Herbert on 7/1/18.
//  Copyright © 2018 Tyler. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var FirebaseInterface_1 = require("./FirebaseInterface");
var LoginData_1 = require("./LoginData");
var Savable = /** @class */ (function (_super) {
    __extends(Savable, _super);
    function Savable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*      [ Saving ]       */
    Savable.prototype.save = function () {
        var db = LoginData_1.LoginData.sharedInstance.db;
        var saveTablePath = this.tablePath.saveTablePath(this);
        var saveTableItemPath = this.tablePath.saveTableItemPath(this);
        this.willSave();
        // New object, we get a new UID for it
        if (!this.data['uid']) {
            this.data['uid'] = db.database.ref(saveTablePath).push().key;
        }
        // Save
        db.database.ref(saveTableItemPath).set(this.data);
        this.didSave();
    };
    Savable.prototype.willSave = function () {
        // Does nothing, can be overriden in subclass
    };
    Savable.prototype.shouldSave = function () {
        return true;
    };
    Savable.prototype.didSave = function () {
        // Does nothing, can be overriden in subclass
    };
    return Savable;
}(FirebaseInterface_1.FirebaseInterface));
exports.Savable = Savable;
