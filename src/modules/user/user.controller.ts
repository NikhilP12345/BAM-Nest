import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetUserDto, SaveGroupDto, UserDto } from "src/dto/user.dto";
import { IUserGroup } from "src/interfaces/schema.interface";
import { UserService } from "./user.service";

@Controller({
    path: 'user'
})
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    async getUser(getUserDto: GetUserDto){
        return this.userService.getUser(getUserDto)
    }

    @Post('savegroup')
    async saveGroupToUser(@Body() saveGroupDto: IUserGroup){
        let userDto: UserDto = {
            first_name: 'niks',
            last_name: 'parihar',
            profile_picture: 'dsfcdf',
            phone_number: 9660677180,
            email: 'sdfsdef',
            dateofbirth: new Date(),
            gender:'male'
        }
        return await this.userService.saveGroupToUser(saveGroupDto, userDto)
    }
    
    @Get('getgroup')
    async getGroup(@Body() getUserDto: GetUserDto){
        return this.userService.getGroup(getUserDto)
    }

    
}