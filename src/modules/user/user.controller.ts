import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetUserDto, SaveGroupDto, UserDto } from "src/dto/user.dto";
import { IUserGroup } from "src/interfaces/schema.interface";
import { UserService } from "./user.service";
import {validatorDto} from "core/errors/validate"

@Controller({
    path: 'user'
})
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @Post()
    async saveUser(@Body() getUserDto: GetUserDto){
        try{
            await validatorDto(GetUserDto, getUserDto)
        
        }
        catch(error){
            throw error
        }
    }

    @Get()
    async getUser(@Body() getUserDto: GetUserDto){
        return this.userService.getUser(getUserDto)
    }

    @Post('savegroup')
    async saveGroupToUser(@Body() saveGroupDto: IUserGroup){
        let userDto: UserDto = {
            _id: "6230d6218b897f4f51c2b33b",
            gender: "Male",
            dateofbirth: new Date(),
            email: "sdfsdef",
            phone_number: 9660677180,
            profile_picture: "dsfcdf",
            last_name: "parihar",
            first_name: "niks"
        }
        return await this.userService.saveGroupToUser(saveGroupDto, userDto)
    }
    

    
}