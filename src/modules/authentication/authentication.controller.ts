import { Body, Controller, Post, UseGuards } from "@nestjs/common";
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
            return{
                message: error.message || `Error at login Application`,
                statusCode: 400
            }
        }
    }

    @Post('/verify-user')
    async verifyUser(@Body() verifyUserDto: VerifyUserDto){
        try{
            const response = await this.authService.verifyUser(verifyUserDto);
            return response
        }
        catch(error){
            return{
                message: error.message || `Error at Verify User`,
                statusCode: 400
            }
        }
    }
}