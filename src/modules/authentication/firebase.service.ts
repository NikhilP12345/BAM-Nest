import { Injectable } from "@nestjs/common";
import admin from "src/config/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { LoginDTO } from "src/dto/authentication.dto";


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

    // async signInPhoneNumber(loginDto: LoginDTO){
    //     const auth = getAuth();
    //     const b = new RecaptchaVerifier('sign-in-button', {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         onSignInSubmit();
    //     }
    //     }, auth);
    //     const a = await signInWithPhoneNumber(auth, loginDto.phone_number.toString(), )

    // }



}