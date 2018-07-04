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

export class Loadable extends FirebaseInterface {

    public childTypes: any[];

    public children: {};

    /*      [ Load children ]       */

    public importData(data) {
        const self = this;

        if (!data) return;

        // Takes the given data and maps it to the keys
        for (const keyRecord of self.keys) {
            const fieldKey = keyRecord['key'];
            if (data[fieldKey]) {
                self.data[fieldKey] = data[fieldKey];
            }
        }
    }

    public loadChildren(childType, callback) {
        const db = LoginData.sharedInstance.db;
        const loginId = LoginData.sharedInstance.loginId;
        const self = this;

        db.database.ref(loginId + '/' + childType.tableName).orderByChild(self.constructor['tableName'] + 'Id').equalTo(self.data['uid']).once('value').then(function (response) {
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
        const db = LoginData.sharedInstance.db;
        const loginId = LoginData.sharedInstance.loginId;
        const self = this;

        db.database.ref(loginId + '/' + self.constructor['tableName'] + '/' + self.data['uid']).once('value').then(function (response) {
            self.importData(response.val());
            if (callback) callback();
        });
    }
}
