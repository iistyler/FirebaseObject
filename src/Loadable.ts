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

import { FirebaseInterface } from './FirebaseInterface';
import { LoginData } from './LoginData';
import { AsyncBlock } from 'simple-async-block/AsyncBlock';
import { ObjectPath } from "./ObjectPath";

export class Loadable<T extends object> extends FirebaseInterface<T> {

    public static loadAllOfType(type, callback) {
        const db = Loadable.loginDataInstance().db;
        const loginId = Loadable.loginDataInstance().loginId;
        const loadAllPath = type.classTablePath.loadAllPath(type);

        db.ref(loadAllPath).once('value').then(function (response) {
            const objectsJSON = response.val();
            const newObjects = {};
            for (const key in objectsJSON) {
                const objectJSON = objectsJSON[key];
                newObjects[objectJSON.uid] = new type(objectJSON);
            }
            callback(newObjects)
        });
    }

    public childTypes: any[];

    public children: {};

    public associatedObjectTypes: any[];

    public associatedObjects: {};

    public static loginDataInstance = () => {
        return LoginData.sharedInstance;
    };

    /*      [ Load children ]       */

    public importData(data: T) {
        const self = this;

        if (!data) return;
        if (!self.data) {
          self.data = {} as any as T;
        }
        
        // Takes the given data and maps it to the keys
        for (const keyRecord of self.keys) {
            const fieldKey = keyRecord['key'];
            if (data[fieldKey]) {
                self.data[fieldKey] = data[fieldKey];
            }
        }
    }

    public loadChildren(childType, callback) {
        const db = this.loginDataInstance().db;
        const loginId = this.loginDataInstance().loginId;
        const self = this;
        const loadChildrenPath = this.tablePath.loadChildrenPath(this, childType);
        const loadChildrenConditionParameter = this.tablePath.loadChildrenConditionParameter(this);
        const loadChildrenConditionValue = this.tablePath.loadChildrenConditionValue(this);

        db.ref(loadChildrenPath).orderByChild(loadChildrenConditionParameter).equalTo(loadChildrenConditionValue).once('value').then(function (response) {
            const childObjectsJSON = response.val();
            const childObjects = {};
            for (const key in childObjectsJSON) {
              const childObjectJSON = childObjectsJSON[key];
                childObjects[childObjectJSON.uid] = new childType(childObjectJSON);
            }
            self.children[childType.tableName] = childObjects;
            if (callback) callback();
        });
    }

    public loadAssociatedObjects(callback) {

    	const self = this;
		const block = new AsyncBlock();

		block.onStart((async) => {
			for (const objectType of self.associatedObjectTypes) {
				async.startBlock();
				this.loadAssociatedObjectType(objectType, () => {
					async.endBlock();
				});
			}
		});

		block.onComplete((result) => {
			if (callback) callback();
		});

		block.start();
	}

    public loadAssociatedObjectType(type, callback) {
    	const self = this;
    	const block = new AsyncBlock();

    	block.onStart((async) => {
			for (const objectId of self.data[type.tableName + "Ids"]) {
				async.startBlock();
				self.associatedObjects[type.tableName] = {};
				this.loadAssociatedObject(type, objectId, () => {
					async.endBlock();
				});
			}
		});

    	block.onComplete((result) => {
    		if (callback) callback();
		});

		block.start();
	}

    public loadAssociatedObject(type, id, callback) {
		const db = this.loginDataInstance().db;
		const loginId = this.loginDataInstance().loginId;
		const self = this;
		const path = this.tablePath.loadAssociatedPath(type, id);

		db.ref(path).once('value').then(function (response) {
			const objectJSON = response.val();
			self.associatedObjects[type.tableName][id] = new type(objectJSON);
			if (callback) callback();
		});
	}

    public loadAllChildren(callback) {
        const self = this;

          const asyncBlock = new AsyncBlock();

          asyncBlock.onStart((async) => {
              for (let childType of self.childTypes) {
                  async.startBlock();
                  self.loadChildren(childType, () => {
                      async.endBlock();
                  });
              }
          });

          asyncBlock.onComplete(() => {
              if (callback) callback();
          });

          asyncBlock.start();
    }

    public loadSelf(callback=null) {
        const db = this.loginDataInstance().db;
        const self = this;
        const loadSelfPath = this.tablePath.loadSelfPath(this);

        db.ref(loadSelfPath).once('value').then(function (response) {
            self.importData(response.val());
            if (callback) callback();
        });
    }
}
