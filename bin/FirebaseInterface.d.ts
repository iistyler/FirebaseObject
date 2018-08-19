import { ObjectPath } from "./ObjectPath";
import { LoginData } from "./LoginData";
export declare class FirebaseInterface {
    constructor();
    static tableName: string;
    data: {};
    loginDataInstance: () => LoginData;
    keys: {}[];
    static classTablePath: ObjectPath;
    tablePath: ObjectPath;
}
