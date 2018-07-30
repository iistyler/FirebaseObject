import { FirebaseInterface } from './FirebaseInterface';
export declare class Loadable extends FirebaseInterface {
    static loadAllOfType(type: any, callback: any): void;
    childTypes: any[];
    children: {};
    importData(data: any): void;
    loadChildren(childType: any, callback: any): void;
    loadAllChildren(callback: any): void;
    loadSelf(callback?: any): void;
}
