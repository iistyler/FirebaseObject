import { AngularFireDatabase } from 'angularfire2/database';
export declare class LoginData {
    static sharedInstance: LoginData;
    db: AngularFireDatabase;
    authenticated: boolean;
    username: any;
    loginId: string;
}
