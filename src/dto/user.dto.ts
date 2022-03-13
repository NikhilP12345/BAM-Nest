
export class GetUserDto{
    phoneNumber: number;
    groupName? : string 
}

export class SaveGroupDto{
    name: string
    contacts: Array<UserContactDto>
}

export class UserContactDto{
    contactName: string;
    contactNumber: number;
    contactUserId: string;
    contactPhotoUrl: string;
}

export class UserDto{
    first_name: string;
    last_name: string;
    profile_picture: string;
    phone_number: number;
    email: string;
    dateofbirth: Date;
    gender:string;
}