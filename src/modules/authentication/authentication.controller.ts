import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginDTO } from "src/dto/authentication.dto";
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
        return this.authService.loginWithCredentials(loginDto);
    }
}