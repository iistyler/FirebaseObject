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
var AsyncBlock_1 = require("simple-async-block/AsyncBlock");
var Loadable = /** @class */ (function (_super) {
    __extends(Loadable, _super);
    function Loadable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*      [ Load children ]       */
    Loadable.prototype.importData = function (data) {
        var self = this;
        if (!data)
            return;
        // Takes the given data and maps it to the keys
        for (var _i = 0, _a = self.keys; _i < _a.length; _i++) {
            var keyRecord = _a[_i];
            var fieldKey = keyRecord['key'];
            if (data[fieldKey]) {
                self.data[fieldKey] = data[fieldKey];
            }
        }
    };
    Loadable.prototype.loadChildren = function (childType, callback) {
        var db = LoginData_1.LoginData.sharedInstance.db;
        var loginId = LoginData_1.LoginData.sharedInstance.loginId;
        var self = this;
        db.database.ref(loginId + '/' + childType.tableName).orderByChild(self.constructor['tableName'] + 'Id').equalTo(self.data['uid']).once('value').then(function (response) {
            var childObjectsJSON = response.val();
            var childObjects = {};
            for (var key in childObjectsJSON) {
                var childObjectJSON = childObjectsJSON[key];
                childObjects[childObjectJSON.uid] = new childType(childObjectJSON);
            }
            self.children[childType.tableName] = childObjects;
            if (callback)
                callback();
        });
    };
    Loadable.prototype.loadAllChildren = function (callback) {
        var self = this;
        var asyncBlock = new AsyncBlock_1.AsyncBlock();
        asyncBlock.onStart(function (async) {
            for (var _i = 0, _a = self.childTypes; _i < _a.length; _i++) {
                var childType = _a[_i];
                async.startBlock();
                self.loadChildren(childType, function () {
                    async.endBlock();
                });
            }
        });
        asyncBlock.onComplete(function () {
            if (callback)
                callback();
        });
        asyncBlock.start();
    };
    Loadable.prototype.loadSelf = function (callback) {
        if (callback === void 0) { callback = null; }
        var db = LoginData_1.LoginData.sharedInstance.db;
        var loginId = LoginData_1.LoginData.sharedInstance.loginId;
        var self = this;
        db.database.ref(loginId + '/' + self.constructor['tableName'] + '/' + self.data['uid']).once('value').then(function (response) {
            self.importData(response.val());
            if (callback)
                callback();
        });
    };
    return Loadable;
}(FirebaseInterface_1.FirebaseInterface));
exports.Loadable = Loadable;