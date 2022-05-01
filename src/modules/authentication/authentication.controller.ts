import { BadRequestException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginDTO, VerifyUserDto } from "src/dto/authentication.dto";
import { Public } from "../../../core/decorators/jwt.decorator";
import { AuthService } from "./authentication.service";

@Controller({
    path: 'bam'
})
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/login')
    async loginApplication(@Body() loginDto: LoginDTO){ 
        try{
            const response = await this.authService.saveUserCredentials(loginDto);
            return response;

        }
        catch(error){
            const message = error.message ||  `Error at login User`
            throw new BadRequestException(message)
        }
    }

    @Post('/verify-user')
    async verifyUser(@Body() verifyUserDto: VerifyUserDto){
        try{
            const response = await this.authService.verifyUser(verifyUserDto);
            return response
        }
        catch(error){
            const message = error.message ||  `Error at verify User`
            throw new BadRequestException(message)
        }
    }
}