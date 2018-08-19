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
import { ObjectPath } from "./ObjectPath";

export class Savable extends FirebaseInterface {

    /*      [ Saving ]       */

    public save() {
        const db = this.loginDataInstance().db;
        const saveTablePath = this.tablePath.saveTablePath(this);

        this.willSave();

        // New object, we get a new UID for it
        if (!this.data['uid']) {
            this.data['uid'] = db.ref(saveTablePath).push().key;
        }
        const saveTableItemPath = this.tablePath.saveTableItemPath(this);

        // Save
        db.ref(saveTableItemPath).set(this.data);

        this.didSave();
    }

    public willSave() {
        // Does nothing, can be overriden in subclass
    }

    public shouldSave() {
        return true;
    }

    public didSave() {
        // Does nothing, can be overriden in subclass
    }
}
