import { LoginData } from "./LoginData";
export declare class ObjectPath {
    loginDataInstance: LoginData;
    loadSelfPath: (object: any) => string;
    saveTablePath: (object: any) => string;
    saveTableItemPath: (object: any) => string;
    deleteTableItemPath: (object: any) => string;
    defaultTablePath: (object: any) => string;
    defaultItemPath: (object: any) => string;
    loadChildrenPath: (object: any, childType: any) => string;
    loadAssociatedPath: (objectType: any, childId: String) => string;
    loadChildrenConditionParameter: (object: any) => string;
    loadChildrenConditionValue: (object: any) => any;
    loadAllPath: (object: any) => string;
}
