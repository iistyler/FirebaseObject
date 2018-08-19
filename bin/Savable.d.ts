import { FirebaseInterface } from './FirebaseInterface';
export declare class Savable extends FirebaseInterface {
    save(): void;
    willSave(): void;
    shouldSave(): boolean;
    didSave(): void;
}
