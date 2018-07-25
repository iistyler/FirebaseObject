import { Savable } from "./Savable";
import { Deletable } from "./Deletable";
import { Loadable } from "./Loadable";
import { ObjectPath } from "./ObjectPath";
export declare class FirebaseObject implements Savable, Deletable, Loadable {
    static tableName: string;
    data: {};
    tablePath: ObjectPath;
    keys: {}[];
    importData: (any) => void;
    loadSelf: (callback) => void;
    save: () => void;
    willSave: () => void;
    shouldSave: () => boolean;
    didSave: () => void;
    delete: () => void;
    willDelete: () => void;
    shouldDelete: () => boolean;
    didDelete: () => void;
    loadChildren: (any) => void;
    loadAllChildren: () => void;
    childTypes: any[];
    children: {};
}
