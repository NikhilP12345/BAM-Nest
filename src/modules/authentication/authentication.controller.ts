import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginDTO } from "src/dto/authentication.dto";
import { AuthService } from "./authentication.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller({
    path: 'bam'
})
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginApplication(@Body() loginDto: LoginDTO){
        await this.authService.getByPhoneNo(loginDto)
    }
}