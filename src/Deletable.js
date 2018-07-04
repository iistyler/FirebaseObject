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
var Deletable = /** @class */ (function (_super) {
    __extends(Deletable, _super);
    function Deletable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*      [ Saving ]       */
    Deletable.prototype["delete"] = function () {
        var db = LoginData_1.LoginData.sharedInstance.db;
        var loginId = LoginData_1.LoginData.sharedInstance.loginId;
        this.willDelete();
        // Delete
        if (this.shouldDelete()) {
            db.database.ref(loginId + '/' + this.constructor['tableName'] + '/' + this.data['uid']).remove();
        }
        this.didDelete();
    };
    Deletable.prototype.willDelete = function () {
        // Does nothing, can be overriden in subclass
    };
    Deletable.prototype.shouldDelete = function () {
        return true;
    };
    Deletable.prototype.didDelete = function () {
        // Does nothing, can be overriden in subclass
    };
    return Deletable;
}(FirebaseInterface_1.FirebaseInterface));
exports.Deletable = Deletable;
