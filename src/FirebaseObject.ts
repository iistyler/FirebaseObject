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

import { Savable } from "./Savable";
import { Deletable } from "./Deletable";
import { Loadable } from "./Loadable";
import { ObjectPath } from "./ObjectPath";
import { LoginData } from "./LoginData";

export class FirebaseObject<T extends object = {}> implements Savable<T>, Deletable<T>, Loadable<T> {

    public static tableName: string;

    public loginDataInstance = () => {
        return LoginData.sharedInstance;
    };

    /// Data loaded from FB
    public data: T;

	  public tablePath = new ObjectPath();

    public static classTablePath = new ObjectPath();

    /// Keys to load from FB
    public keys: { key: string, [otherProperty: string]: any }[];

    /*      [ Loadable ]       */

    public importData: (data: T) => void;

    public loadSelf: (callback) => void;

    /*      [ Saving ]       */

    public save: () => Promise<any>;

    public willSave: () => void;

    public shouldSave: () => boolean;

    public didSave: () => void;

    /*      [ Deleting ]       */

    public delete: () => void;

    public willDelete: () => void;

    public shouldDelete: () => boolean;

    public didDelete: () => void;

    /*      [ Loading ]       */

    public loadChildren: (callback) => void;

    public loadAllChildren: (callback) => void;

    public childTypes: any[];

    public children: {};

	public associatedObjectTypes: any[];

	public associatedObjects: {};

	public loadAssociatedObjects: (callback) => void;

	public loadAssociatedObjectType: (type, callback) => void;

	public loadAssociatedObject: (type, id, callback) => void;
}
applyMixins(FirebaseObject, [Savable, Deletable, Loadable]);

//// Function used to apply multiple inheritance
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
