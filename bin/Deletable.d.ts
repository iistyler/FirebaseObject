import { FirebaseInterface } from "./FirebaseInterface";
export declare class Deletable extends FirebaseInterface {
    delete(): void;
    willDelete(): void;
    shouldDelete(): boolean;
    didDelete(): void;
}
