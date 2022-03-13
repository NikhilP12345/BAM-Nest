import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetUserDto, SaveGroupDto, UserDto } from "src/dto/user.dto";
import { IUserGroup } from "src/interfaces/schema.interface";
import { User, UserDocument } from "src/schemas/user.schema";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userModal: Model<UserDocument>
    ){}

    async getUser(getUserDto: GetUserDto){
        return await this.userModal.findOne({
            phone_number: getUserDto.phoneNumber
        })
    }

    async saveGroupToUser(saveGroupDto: IUserGroup, userDto: UserDto){
        try{
            console.log(saveGroupDto)
            const filter = {
                    phone_number: userDto.phone_number,
                }
            const user = await this.userModal.findOne(filter);
            if(!user){
                throw " Üser not present"
            }
            const groups = user.groups;
            console.log(saveGroupDto);
            
            const userGroups = groups.filter(group => group.name === saveGroupDto.name);
            if(!userGroups || (userGroups && !userGroups.length)){
                groups.push(saveGroupDto)
            }
            else{
                const userGroupIndex = groups.findIndex(group => group.name === saveGroupDto.name)
                const userGroupName = userGroups[0];
                const finalContacts = [
                    ...saveGroupDto.contacts
                ]
                for (const con of saveGroupDto.contacts){
                    const contacts = userGroupName.contacts.filter(contact => contact.contact_number === con.contact_number && contact.user_id === con.user_id );
                    if(!contacts || (contacts && !contacts.length)){
                        finalContacts.push(con);
                    }
                    else{
                        const contactIndex = userGroupName.contacts.findIndex(contact => contact.contact_number === con.contact_number && contact.user_id === con.user_id );
                        finalContacts[contactIndex] = con

                    }
                }
                userGroupName.contacts = finalContacts
                groups[userGroupIndex] = userGroupName
                
            }
            console.log(user)
            return await this.userModal.updateOne(filter, {
               groups: groups
            })
        }
        catch(error){
            throw error
        }
    }

    async getGroup(getUserDto: GetUserDto){
        const filter = {
            $or: [
                {phone_number: getUserDto.phoneNumber},
                { groups : { $elemMatch: {  name : { $eq:  getUserDto.groupName} } } }
            ]
        }
        return await this.userModal.findOne(getUserDto)
    }
}