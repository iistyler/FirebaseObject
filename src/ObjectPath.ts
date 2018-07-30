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


import { LoginData } from "./LoginData";

export class ObjectPath {

	/// Path used for loading the object with `loadSelf`
	public loadSelfPath = (object: any) => {
		return this.defaultItemPath(object);
	};

	/// Path used for saving object
	public saveTablePath = (object: any) => {
		return this.defaultTablePath(object);
	};

	/// Path used for saving object
	public saveTableItemPath = (object: any) => {
		return this.defaultItemPath(object);
	};

	/// Path used for deleting object
	public deleteTableItemPath = (object: any) => {
		return this.defaultItemPath(object);
	};

	/// default path of the items table
	public defaultTablePath = (object: any) => {
		const loginId = LoginData.sharedInstance.loginId;
		return loginId + '/' + object.constructor['tableName'];
	};

	/// default path of the item
	public defaultItemPath = (object: any) => {
		return this.defaultTablePath(object) + '/' + object.data['uid'];
	};

	/// Path to load children from
	public loadChildrenPath = (object: any, childType: any) => {
		const loginId = LoginData.sharedInstance.loginId;
		return loginId + '/' + childType.tableName
	};

	public loadChildrenConditionParameter = (object: any) => {
		return object.constructor['tableName'] + 'Id'
	};

	public loadChildrenConditionValue = (object: any) => {
		return object.constructor['tableName'] + 'Id'
	};

	public loadAllPath = (object: any) => {
		const loginId = LoginData.sharedInstance.loginId;
		return loginId + '/' + object.tableName;
	}

}
