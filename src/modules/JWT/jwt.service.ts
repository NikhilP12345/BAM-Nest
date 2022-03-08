import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginDTO } from 'src/dto/authentication.dto';
import { AuthService } from 'src/modules/authentication/authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY || 'this_is_secret',
        });  
    }
    
    async validate(payload: LoginDTO): Promise<any> {
        const user = await this.authService.validateUser(payload);
        if (!user) { 
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}