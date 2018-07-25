import { FirebaseInterface } from './FirebaseInterface';
export declare class Loadable extends FirebaseInterface {
    childTypes: any[];
    children: {};
    importData(data: any): void;
    loadChildren(childType: any, callback: any): void;
    loadAllChildren(callback: any): void;
    loadSelf(callback?: any): void;
    static loadAll(callback: any): void;
}
