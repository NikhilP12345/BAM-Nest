import { Injectable } from "@nestjs/common";
import admin from "src/config/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { LoginDTO } from "src/dto/authentication.dto";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";


@Injectable()
export class FirebaseService{
    private db = admin.firestore();
    constructor(
    )
    {}

    async getUserFromDb(): Promise<any>{
        try{
            return await this.db.collection('User').get();
        }
        catch(error){
            throw new Error("Unable to fetch data from user")
        }
    }

    async getUserByUidFromDb(uid: string): Promise<any>{
        try{
            return await this.db.collection('User').doc(uid).get();
        }
        catch(error){
            throw new Error(`Unable to fetch data from ${uid}`)
        }
    }

    async notifyUserThroughNotification(fcmTokens: Array<string>, userI:Record<string, string | number>){
        try{
            const message: MulticastMessage = {
                notification: {
                    title: 'Help Me!!!',
                    body: `${userI.name} is stuck and is looking for helpers.\nCan You help him?`
                },
                data: {
                    "click_action": "FLUTTER_NOTIFICATION_CLICK",
                    "sound": "default",
                    'type': 'help',
                    userInfo: JSON.stringify(userI)
                },
                tokens: fcmTokens,
            };

            await admin.messaging().sendMulticast(message);
            
        }
        catch(error){
            throw error;
        }

    }



}