export declare class ObjectPath {
    loadSelfPath: (object: any) => string;
    saveTablePath: (object: any) => string;
    saveTableItemPath: (object: any) => string;
    deleteTableItemPath: (object: any) => string;
    defaultTablePath: (object: any) => string;
    defaultItemPath: (object: any) => string;
    loadChildrenPath: (object: any, childType: any) => string;
    loadAssociatedPath: (objectType: any, childId: String) => string;
    loadChildrenConditionParameter: (object: any) => string;
    loadChildrenConditionValue: (object: any) => string;
    loadAllPath: (object: any) => string;
}
